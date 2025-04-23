# af-qventus-challenge

A reusable login indicator component.

## Installation

Install with NPM

```bash
npm i --save af-qventus-challenge
```

Install with yarn

```bash
yarn add af-qventus-challenge
```

## Usage

Import and use `Login` component in your react project

```jsx
import { Login } from 'af-qventus-challenge';

const App = () => {
  const handleChange = () => {};

  return (
    <Login
      options={[
        'hasDigit',
        'hasUpperCaseLetter',
        'hasSpecialCharacter',
        'hasNoConsecutiveLetter',
      ]}
      onChange={handleChange}
    />
  );
};
```

## Props

| Prop           | Type     | Default   | Required | Description                                                                                                                              |
| -------------- | -------- | --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `classes`      | object   | {}        | false    | Classes to style `root`, `input` and `list`                                                                                              |
| `onChange`     | function | undefined | false    | Callback that is triggered when the validity or value change                                                                             |
| `options`      | array    | []        | true     | Rules to being displayed on the component. Options are `hasDigit`, `hasUpperCaseLetter`, `hasSpecialCharacter`, `hasNoConsecutiveLetter` |
| `placeholder ` | string   | ""        | false    | Custom placeholder for the input                                                                                                         |
| `iconSize`     | number   | 'md'      | false    | Custom size of the icons. Options are `sm`, `md` ,`lg` and `xl`                                                                          |
| `icons`        | object   | {}        | false    | Custom icons for valid and invalid states                                                                                                |

## Storybook

Explore and interact with the `Login` component in Storybook.

To run Storybook locally:

1. Clone the repository:

```bash
git clone git@github.com:afiorenza/qventus-challenge.git
```

2. Install dependencies:

```bash
npm install
```

3. Start storybook

```bash
npm run storybook
```

4. Check on the terminal the url and enjoy :)

## License

MIT License. See LICENSE for more information.
