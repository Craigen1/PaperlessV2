import React from "react";

export default function GoTop() {
  const TableComponent = [
    // a long List of questions
    { label: "What is React?" },
    { label: "What are the major features of React?" },
    { label: "What is JSX?" },
    { label: "What is the difference between Element and Component?" },
    { label: "How to create components in React?" },
    { label: "When to use a Class Component over a Function Component?" },
    { label: "What are Pure Components?" },
    { label: "What is state in React?" },
    { label: "What are props in React?" },
    { label: "What is the difference between state and props?" },
    { label: "Why should we not update the state directly?" },
    {
      label:
        "What is the purpose of callback function as an argument of setState()?",
    },
    { label: "What is the difference between HTML and React event handling?" },
    { label: "How to bind methods or event handlers in JSX callbacks?" },
    { label: "How to pass a parameter to an event handler or callback?" },
    { label: "What are synthetic events in React?" },
    { label: "What are inline conditional expressions?" },
    {
      label:
        "What is 'key' prop and what is the benefit of using it in arrays of elements?",
    },
    { label: "What is the use of refs?" },
    { label: "How to create refs?" },
    { label: "What are forward refs?" },
    {
      label:
        "Which is preferred option with in callback refs and findDOMNode()?",
    },
    { label: "Why are String Refs legacy?" },
    { label: "What is Virtual DOM?" },
    { label: "How Virtual DOM works?" },
    { label: "What is the difference between Shadow DOM and Virtual DOM?" },
    { label: "What is React Fiber?" },
    { label: "What is the main goal of React Fiber?" },
    { label: "What are controlled components?" },
    { label: "What are uncontrolled components?" },
    {
      label: "What is the difference between createElement and cloneElement?",
    },
    { label: "What is Lifting State Up in React?" },
    { label: "What are the different phases of component lifecycle?" },
    { label: "What are the lifecycle methods of React?" },
    { label: "What are Higher-Order components?" },
    { label: "How to create props proxy for HOC component?" },
    { label: "What is context?" },
    { label: "What is children prop?" },
    { label: "How to write comments in React?" },
    {
      label:
        "What is the purpose of using super constructor with props argument?",
    },
    { label: "What is reconciliation?" },
    { label: "How to set state with a dynamic key name?" },
    {
      label:
        "What would be the common mistake of function being called every time the component renders?",
    },
    { label: "Is lazy function supports named exports?" },
    { label: "Why React uses className over class attribute?" },
    { label: "What are fragments?" },
    { label: "Why fragments are better than container divs?" },
    { label: "What are portals in React?" },
    { label: "What are stateless components?" },
    { label: "What are stateful components?" },
    { label: "How to apply validation on props in React?" },
    { label: "What are the advantages of React?" },
    { label: "What are the limitations of React?" },
    { label: "What are error boundaries in React v16" },
    { label: "How are error boundaries handled in React v15?" },
    { label: "What are the recommended ways for static type checking?" },
    { label: "What is the use of react-dom package?" },
    { label: "What is the purpose of render method of react-dom?" },
    { label: "What is ReactDOMServer?" },
    { label: "How to use InnerHtml in React?" },
    { label: "How to use styles in React?" },
    { label: "How events are different in React?" },
    { label: "What will happen if you use setState in constructor?" },
    { label: "What is the impact of indexes as keys?" },
    { label: "Is it good to use setState() in componentWillMount() method?" },
    { label: "What will happen if you use props in initial state?" },
    { label: "How do you conditionally render components?" },
    {
      label: "Why we need to be careful when spreading props on DOM elements??",
    },
    { label: "How you use decorators in React?" },
    { label: "How do you memoize a component?" },
    { label: "How you implement Server-Side Rendering or SSR?" },
    { label: "How to enable production mode in React?" },
    { label: "What is CRA and its benefits?" },
    { label: "What is the lifecycle methods order in mounting?" },
    {
      label:
        "What are the lifecycle methods going to be deprecated in React v16?",
    },
    {
      label:
        "What is the purpose of getDerivedStateFromProps() lifecycle method?",
    },
    {
      label:
        "What is the purpose of getSnapshotBeforeUpdate() lifecycle method?",
    },
    { label: "Do Hooks replace render props and higher order components?" },
    { label: "What is the recommended way for naming components?" },
    {
      label: "What is the recommended ordering of methods in component class?",
    },
    { label: "What is a switching component?" },
    { label: "Why we need to pass a function to setState()?" },
    { label: "What is strict mode in React?" },
    { label: "What are React Mixins?" },
    {
      label:
        "Why is isMounted() an anti-pattern and what is the proper solution?",
    },
    { label: "What are the Pointer Events supported in React?" },
    { label: "Why should component names start with capital letter?" },
    { label: "Are custom DOM attributes supported in React v16?" },
    {
      label: "What is the difference between constructor and getInitialState?",
    },
    {
      label: "Can you force a component to re-render without calling setState?",
    },
    {
      label:
        "What is the difference between super() and super(props) in React using ES6 classes?",
    },
    { label: "How to loop inside JSX?" },
    { label: "How do you access props in attribute quotes?" },
    { label: "What is React PropType array with shape?" },
    { label: "How to conditionally apply class attributes?" },
    { label: "What is the difference between React and ReactDOM?" },
    { label: "Why ReactDOM is separated from React?" },
    { label: "How to use React label element?" },
    { label: "How to combine multiple inline style objects?" },
    { label: "How to re-render the view when the browser is resized?" },
    {
      label:
        "What is the difference between setState and replaceState methods?",
    },
    { label: "How to listen to state changes?" },
    {
      label:
        "What is the recommended approach of removing an array element in react state?",
    },
    { label: "Is it possible to use React without rendering HTML?" },
    { label: "How to pretty print JSON with React?" },
    { label: "Why you can't update props in React?" },
    { label: "How to focus an input element on page load?" },
    { label: "What are the possible ways of updating objects in state?" },
    {
      label: "How can we find the version of React at runtime in the browser?",
    },
    {
      label:
        "What are the approaches to include polyfills in your create-react-app?",
    },
    { label: "How to use https instead of http in create-react-app?" },
    { label: "How to avoid using relative path imports in create-react-app?" },
    { label: "How to add Google Analytics for react-router?" },
    { label: "How to update a component every second?" },
    { label: "How do you apply vendor prefixes to inline styles in React?" },
    { label: "How to import and export components using react and ES6?" },
    { label: "What are the exceptions on React component naming?" },
    { label: "Why is a component constructor called only once?" },
    { label: "How to define constants in React?" },
    { label: "How to programmatically trigger click event in React?" },
    { label: "Is it possible to use async/await in plain React?" },
    { label: "What are the common folder structures for React?" },
    { label: "What are the popular packages for animation?" },
    { label: "What is the benefit of styles modules?" },
    { label: "What are the popular React-specific linters?" },
    {
      label:
        "How to make AJAX call and In which component lifecycle methods should I make an AJAX call?",
    },
    { label: "What are render props?" },
  ];

  return (
    <div className="frame mt-2" id="topDiv">
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Questions</th>
          </tr>
        </thead>
        <thead>
          {TableComponent.map((item, index) => (
            <>
              <tr>
                <th>{index + 1}</th>
                <th>{item.label}</th>
              </tr>
            </>
          ))}
        </thead>
      </table>

      <div className="fixed right-2 bottom-2 bg-gray-410 rounded-md">
        <a href="#topDiv" className="text-white px-2 py-1 no-underline">
          Go to Top
        </a>
      </div>
    </div>
  );
}
