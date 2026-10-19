// Message the contact form starts with, set by the module picker's call to action.
let prefill = '';
export const setPrefill = (v) => { prefill = v || ''; };
export const takePrefill = () => { const v = prefill; prefill = ''; return v; };
