<h1 align="center">solid-controlled-input</h1>

<h3 align="center">Porting over react controlled input behavior over to solid</h3>

<br />

<div align="center">

<img src="https://img.shields.io/github/stars/Tronikelis/solid-controlled-input?style=flat-square" />
<img src="https://img.shields.io/bundlephobia/minzip/solid-controlled-input?style=flat-square" />
<img src="https://img.shields.io/npm/v/solid-controlled-input?style=flat-square" />

</div>

<br />

# Shouldn't this be the default behavior?

Well no, if you only have touched react, it actually heavily transforms events and inputs to get its behavior.

For example:
- React's `onChange` fires on every input, while vanilla js doesn't
- Vanilla JS does not have "controlled" inputs, you need to make them manually

# How to use

```tsx
import ControlledInput from "solid-controlled-input"

```

That's it, use this input like you would use the og `<input />`