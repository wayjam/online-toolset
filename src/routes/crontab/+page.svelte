<script>
	import { getContext } from 'svelte';
	import parser from 'cron-parser';

	const { setPageTitle } = getContext('root');
	setPageTitle('Crontab');

	let errMsg = '';
	let cronstr = '';
	let readableStr = '';
	let nextRuns = [];
	const now = new Date();
	let date = {
		second: `${now.getSeconds()}`,
		minute: `${now.getMinutes()}`,
		hour: `${now.getHours()}`,
		dayOfMonth: `${now.getDate()}`,
		month: '*',
		dayOfWeek: '*'
	};

	const parserOptions = {
		currentDate: now,
		iterator: true
	};

	function setDefault() {
		date.second = '*';
		date.minute = '*';
		date.hour = '*';
		date.dayOfMonth = '*';
		date.month = '*';
		date.dayOfWeek = '*';
		toStr();
	}

	function toStr() {
		errMsg = '';
		cronstr = `${date.second} ${date.minute} ${date.hour} ${date.dayOfMonth} ${date.month} ${date.dayOfWeek}`;
		update();
	}

	function toReadable() {
		errMsg = '';
		try {
			const splited = cronstr.split(' ');
			if (splited.length == 6) {
				date.second = splited[0];
				date.minute = splited[1];
				date.hour = splited[2];
				date.dayOfMonth = splited[3];
				date.month = splited[4];
				date.dayOfWeek = splited[5];
			}
			update();
		} catch (e) {
			errMsg = e.message;
			setDefault();
		}
	}

	function handleKeydown(e) {
		if (e.key != 'Enter') {
			return;
		}
		toReadable();
	}

	function update() {
		try {
			nextRuns = [];
			const interval = parser.parseExpression(cronstr, parserOptions);
			for (let i = 0; i < 5; i++) {
				const next = interval.next();
				nextRuns.push(next.value.toString());
			}
			if (globalThis.cronstrue) {
				readableStr = globalThis.cronstrue.toString(cronstr);
			}
		} catch (e) {
			errMsg = e.message;
		}
	}

	// init
	toStr();
</script>

<svelte:head>
	<script src="https://unpkg.com/cronstrue@latest/dist/cronstrue.min.js"></script>
</svelte:head>

<div class="container mx-auto px-4">
	<div class="notranslate flex flex-col">
		<table class="border-solid border px-10 py-2 my-5 w-full">
			<thead class="text-2xl">
				<tr>
					<th class="border border-slate-300">Second</th>
					<th class="border border-slate-300">Minute</th>
					<th class="border border-slate-300">Hour</th>
					<th class="border border-slate-300">Day Of Month</th>
					<th class="border border-slate-300">Month</th>
					<th class="border border-slate-300">Day Of Week</th>
				</tr>
			</thead>
			<tbody class="text-lg">
				<tr class="">
					<td class="border border-slate-300">
						<input
							class="text-center w-full"
							bind:value={date.second}
							on:input={toStr}
							placeholder="second (0 - 59, optional)"
						/>
					</td>
					<td class="border border-slate-300">
						<input
							class="text-center w-full"
							bind:value={date.minute}
							on:input={toStr}
							placeholder="minute (0 - 59)"
						/>
					</td>
					<td class="border border-slate-300">
						<input
							class="text-center w-full"
							bind:value={date.hour}
							on:input={toStr}
							placeholder=" hour (0 - 23)"
						/>
					</td>
					<td class="border border-slate-300">
						<input
							class="text-center w-full"
							bind:value={date.dayOfMonth}
							on:input={toStr}
							placeholder="day of month (1 - 31, L)"
						/>
					</td>
					<td class="border border-slate-300">
						<input
							class="text-center w-full"
							bind:value={date.month}
							on:input={toStr}
							placeholder="month (1 - 12)"
						/>
					</td>
					<td class="border border-slate-300">
						<input
							class="text-center w-full"
							bind:value={date.dayOfWeek}
							on:input={toStr}
							placeholder="day of week (0 - 7, 1L - 7L) (0 or 7 is Sun)"
						/>
					</td>
				</tr>
			</tbody>
		</table>
		<div class="border-solid border px-10 py-2 my-5 w-full">
			<div class="leading-relaxed block text-red-500 font-mono">
				{errMsg}
			</div>
			<div class="py-2 font-light font-mono">
				<p>
					* any value<br />
					, value list separator<br />
					- range of values<br />
					/ step values<br />
				</p>
			</div>
			<div class="text-lg w-full py-5">
				<span class="font-bold">Cron Expression: </span><input
					class="w-full p-2 bg-slate-200 italic font-mono"
					bind:value={cronstr}
					on:change={toReadable}
					on:keydown={handleKeydown}
					placeholder=""
				/>
			</div>
			<div class="text-lg py-5">
				<span class="font-bold">Readable: </span>
				<p>{readableStr}</p>
			</div>
			<div class="text-lg py-5">
				<span class="font-bold">NextRun: </span>
				<ul class="italic text-slate-500">
					{#each nextRuns as s}
						<li>{s}</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</div>
