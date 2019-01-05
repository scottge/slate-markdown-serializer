# Slate Markdown Serializer

A Markdown serializer for the [Slate Editor](http://slatejs.org). Requires Slate 0.32+.

## renderMark

This serializer supports the following Slate marks:

```javascript
function renderMark(props) {
  switch (props.mark.type) {
    case 'bold':
      return <strong>{props.children}</strong>;
    case 'code':
      return <Code>{props.children}</Code>;
    case 'italic':
      return <em>{props.children}</em>;
    case 'underlined':
      return <u>{props.children}</u>;
    case 'deleted':
      return <del>{props.children}</del>;
    case 'added':
      return <mark>{props.children}</mark>;
    default:
  }
}
```

## renderNode

This serializer supports the following Slate node keys:

```javascript
function renderNode(props) {
  const { attributes } = props;

  switch (props.node.type) {
    case 'paragraph':
      return <Paragraph {...props} />;
    case 'block-quote':
      return <blockquote {...attributes}>{props.children}</blockquote>;
    case 'bulleted-list':
      return <ul {...attributes}>{props.children}</ul>;
    case 'ordered-list':
      return <ol {...attributes}>{props.children}</ol>;
    case 'todo-list':
      return <ul {...attributes}>{props.children}</ul>;
    case 'table':
      return <table {...attributes}>{props.children}</table>;
    case 'table-row':
      return <tr {...attributes}>{props.children}</tr>;
    case 'table-head':
      return <th {...attributes}>{props.children}</th>;
    case 'table-cell':
      return <td {...attributes}>{props.children}</td>;
    case 'list-item':
      return <li {...attributes}>{props.children}</li>;
    case 'horizontal-rule':
      return <hr />;
    case 'code':
      return <code {...attributes}>{props.children}</code>;
    case 'image':
      return <img src={props.src} title={props.title} />;
    case 'link':
      return <a href={props.href}>{props.children}</a>;
    case 'heading1':
      return <h1 {...attributes}>{props.children}</h1>;
    case 'heading2':
      return <h2 {...attributes}>{props.children}</h2>;
    case 'heading3':
      return <h3 {...attributes}>{props.children}</h3>;
    case 'heading4':
      return <h4 {...attributes}>{props.children}</h4>;
    case 'heading5':
      return <h5 {...attributes}>{props.children}</h5>;
    case 'heading6':
      return <h6 {...attributes}>{props.children}</h6>;
    default:
  }
};
```

## Difference from slate-md-serializer

The project is forked from @tommoor's [slate-md-serializer](https://github.com/tommoor/slate-md-serializer).  It fixes the following issues and by-design features in @tommoor's, so that the markdown interpretation aligns better with the markdown specification.

### 1. Parsing paragraphs

```
First sentance

Second sentance
```

In tommoor's version this is parsed into three paragraphs:

First sentance

<p>&nbsp;</p>

Second sentance

In my package, this is parsed into two paragraphs:

First sentance

Second sentance


### 2. Parsing link within mark

`**[example](http://example.com/logo.png)**`

In tommoor's version, this is parsed as [example](http://example.com/logo.png).  The mark is lost.  In my package, this is parsed as [**example**](http://example.com/logo.png). The mark is preserved on the link text.


