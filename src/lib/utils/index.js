import { EditorSelection } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { minimalSetup } from 'codemirror';

export function formatJSON(input, indent, isObj) {
	if (typeof input === 'string') {
		let s = '';
		try {
			s = JSON.parse(input);
		} catch (error) {
			return '';
		}
		if (isObj) {
			return JSON.stringify(s, null, indent);
		} else {
			const obj = JSON.parse(s);
			return JSON.stringify(obj, null, indent);
		}
	} else {
		return JSON.stringify(input, null, indent);
	}
}

const codeMirrorUtils = {
	lineWrapping: EditorView.lineWrapping,

	baseExtensions: [
		minimalSetup,
		EditorView.theme(
			{
				'&': { height: '100%', width: '100%' },
				'.cm-scroller': { overflow: 'auto' }
			},
			{}
		)
	],

	setValue(editor, value) {
		if (!editor.view) {
			return;
		}
		editor.view?.dispatch({
			changes: { from: 0, to: editor.view.state.doc.length, insert: value }
		});
	},

	selectAll(editor) {
		editor.view?.dispatch({
			selection: EditorSelection.create(
				[EditorSelection.range(0, editor.view.state.doc.length), EditorSelection.cursor(0)],
				1
			)
		});
	},

	getValue(editor) {
		return editor.view?.state.doc.toString();
	},

	setFirst(editor) {
		editor.view?.dispatch({ selection: { anchor: 0 } });
	},

	setCursor(editor, cursor) {
		editor.view?.dispatch({ selection: { anchor: cursor } });
	},

	focus(editor) {
		editor.view?.focus();
	}
};
export { codeMirrorUtils };
