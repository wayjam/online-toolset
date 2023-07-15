<script>
	import { getContext } from 'svelte';
	import dayjs from 'dayjs';
	import objectSupport from 'dayjs/plugin/objectSupport';
	import relativeTime from 'dayjs/plugin/relativeTime';
	dayjs.extend(objectSupport);
	dayjs.extend(relativeTime);

	import 'dayjs/locale/zh-cn'; // 导入本地化语言

	const { setPageTitle } = getContext('root');
	setPageTitle('Timestamp');

	let errMsg = '';
	let timestampStr = '';
	let dateStr = '';
	let enableMS = true;

	let obj = dayjs().millisecond(0);
	let date = {
		millisecond: 0,
		second: 0,
		minute: 0,
		date: 0,
		hour: 0,
		month: 0,
		year: 0
	};

	function assign(newObj) {
		date.millisecond = newObj.millisecond();
		date.second = newObj.second();
		date.minute = newObj.minute();
		date.hour = newObj.hour();
		date.month = newObj.month();
		date.date = newObj.date();
		date.year = newObj.year();
	}

	function objChange() {
		errMsg = '';
		if (!enableMS) {
			date.millisecond = 0;
		}
		obj = dayjs({ ...date });
		// to unix epoch
		if (enableMS) {
			timestampStr = obj.valueOf().toString();
		} else {
			timestampStr = obj.unix().toString();
		}
		// to str
		dateStr = obj.toISOString();
	}

	function dateStrChange(e) {
		if (!e || e.key == 'Enter') {
			errMsg = '';
			try {
				obj = dayjs(dateStr);
				if (enableMS) {
					timestampStr = obj.valueOf().toString();
				} else {
					timestampStr = obj.unix().toString();
				}
				assign(obj);
			} catch (e) {
				errMsg = e.message;
			}
		}
	}

	function timestampStrChange(e) {
		if (!e || e.key == 'Enter') {
			errMsg = '';
			try {
				const unixEpoch = parseInt(timestampStr);
				let obj;
				if (enableMS) {
					obj = dayjs(unixEpoch);
				} else {
					obj = dayjs.unix(unixEpoch);
				}
				assign(obj);
				dateStr = obj.toISOString();
			} catch (e) {
				errMsg = e.message;
			}
		}
	}

	function enableMSChange() {
		objChange();
	}

	// init
	assign(obj);
	objChange();
</script>

<div class="container mx-auto px-4">
	<div class="notranslate flex flex-col">
		<table class="border-solid border my-5 table-auto">
			<thead class="text-lg">
				<tr>
					<th class="border border-slate-300">Year</th>
					<th class="border border-slate-300">Month</th>
					<th class="border border-slate-300">Date</th>
					<th class="border border-slate-300">Hour</th>
					<th class="border border-slate-300">Minute</th>
					<th class="border border-slate-300">Second</th>
					{#if enableMS}
						<th class="border border-slate-300">MS</th>
					{/if}
				</tr>
			</thead>
			<tbody class="text-base">
				<tr class="">
					<td class="border border-slate-300">
						<input
							type="number"
							class="text-center w-full"
							bind:value={date.year}
							on:input={objChange}
						/>
					</td>
					<td class="border border-slate-300">
						<input
							type="number"
							class="text-center w-full"
							bind:value={date.month}
							on:input={objChange}
						/>
					</td>
					<td class="border border-slate-300">
						<input
							type="number"
							class="text-center w-full"
							bind:value={date.date}
							on:input={objChange}
						/>
					</td>
					<td class="border border-slate-300">
						<input
							type="number"
							class="text-center w-full"
							bind:value={date.hour}
							on:input={objChange}
						/>
					</td>
					<td class="border border-slate-300">
						<input
							type="number"
							class="text-center w-full"
							bind:value={date.minute}
							on:input={objChange}
						/>
					</td>
					<td class="border border-slate-300">
						<input
							type="number"
							class="text-center w-full"
							bind:value={date.second}
							on:input={objChange}
						/>
					</td>
					{#if enableMS}
						<td class="border border-slate-300">
							<input
								type="number"
								class="text-center w-full"
								bind:value={date.millisecond}
								on:input={objChange}
							/>
						</td>
					{/if}
				</tr>
			</tbody>
		</table>
		<div class="border-solid border px-10 py-2 my-5 w-full">
			<div class="leading-relaxed block text-red-500 font-mono">
				{errMsg}
			</div>
			<input
				id="checked-checkbox"
				type="checkbox"
				bind:checked={enableMS}
				on:change={enableMSChange}
				class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
			/>
			<label
				for="checked-checkbox"
				class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Enable MS</label
			>
			<div class="text-lg w-full py-5">
				<span class="font-bold">Unix epoch time: </span><input
					type="number"
					class="w-full p-2 bg-slate-200 italic font-mono"
					bind:value={timestampStr}
					on:change={timestampStrChange}
					on:keydown={timestampStrChange}
					placeholder=""
				/>
			</div>
			<div class="text-lg w-full py-5 italic">
				<p>
					<span>ISO 8601: </span><input
						class="w-1/2 bg-slate-200 italic font-mono px-2"
						bind:value={dateStr}
						on:change={dateStrChange}
						on:keydown={dateStrChange}
					/>
				</p>
				<p class="text-gray-600"><span>String: </span><code>{obj.toString()}</code></p>
				<p class="text-gray-600"><span>From Now: </span><code>{obj.fromNow()}</code></p>
			</div>
		</div>
	</div>
</div>
