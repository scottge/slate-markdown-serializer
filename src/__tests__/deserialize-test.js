import MarkdownRenderer from '../renderer'
const Markdown = new MarkdownRenderer()

// By parsing, rendering and reparsing we can test both sides of the serializer
// at the same time and ensure that parsing / rendering is compatible.
function deserialized(text) {
  return Markdown.deserialize(text).document.nodes
  //return Markdown.deserialize(Markdown.serialize(Markdown.deserialize(text))).document.nodes
}

test('deserializes paragraph', () => {
  const text = 'This is just a sentance'
  expect(deserialized(text)).toMatchSnapshot()
})

test('deserializes one paragraph', () => {
  const text = `
This is the first sentance
This is the second sentance
`
  expect(deserialized(text)).toMatchSnapshot()
})

test('deserializes two paragraphs', () => {
  const text = `
This is the first sentance

This is the second sentance
`
  expect(deserialized(text)).toMatchSnapshot()
})

test('deserializes two paragraphs seperated by multiple blank lines', () => {
  const text = `
This is the first sentance


This is the second sentance
`
  expect(deserialized(text)).toMatchSnapshot()
})

test('deserializes heading1', () => {
  const text = `# Heading`
  expect(deserialized(text)).toMatchSnapshot()
})

test('deserializes heading2', () => {
  const text = `## Heading`
  expect(deserialized(text)).toMatchSnapshot()
})

test('deserializes heading3', () => {
  const text = `### Heading`
  expect(deserialized(text)).toMatchSnapshot()
})

test('deserializes heading4', () => {
  const text = `#### Heading`
  expect(deserialized(text)).toMatchSnapshot()
})

test('deserializes heading5', () => {
  const text = `##### Heading`
  expect(deserialized(text)).toMatchSnapshot()
})

test('deserializes heading6', () => {
  const text = `###### Heading`
  expect(deserialized(text)).toMatchSnapshot()
})

test('deserializes headings followed by newlines', () => {
  const text = `
a paragraph

## Heading

another paragraph
`
  expect(deserialized(text)).toMatchSnapshot()
})

test('deserializes horizontal rule', () => {
  const text = `
---

a paragraph
`
  expect(deserialized(text)).toMatchSnapshot()
})

test('bold mark', () => {
  const text = `**this is bold**`
  expect(deserialized(text)).toMatchSnapshot()
})

test('italic mark', () => {
  const text = `*this is italic* _this is italic too_`
  expect(deserialized(text)).toMatchSnapshot()
})

test('deleted mark', () => {
  const text = `~~this is strikethrough~~`
  expect(deserialized(text)).toMatchSnapshot()
})

test('inserted mark', () => {
  const text = `++inserted text++`
  expect(deserialized(text)).toMatchSnapshot()
})

test('underlined mark', () => {
  const text = `__underlined text__`
  expect(deserialized(text)).toMatchSnapshot()
})

test('code mark', () => {
  const text = '`const foo = 123;`'
  expect(deserialized(text)).toMatchSnapshot()
})

test('code mark with escaped characters', () => {
  const text = "`<script>alert('foo')</script>`"
  expect(deserialized(text)).toMatchSnapshot()
})

test('deserializes quote', () => {
  const text = `
> this is a quote
`
  expect(deserialized(text)).toMatchSnapshot()
})

test('deserializes quote followed by list with quote', () => {
  const text = `
> this is a quote
1. > this is a list item
`
  expect(deserialized(text)).toMatchSnapshot()
})

test('deserializes quotes separated by newlines', () => {
  const text = `
> this is a quote

> this is a different quote
`
  expect(deserialized(text)).toMatchSnapshot()
})

test('deserializes quote followed by newlines', () => {
  const text = `
> this is a quote

this is a paragraph
`
  expect(deserialized(text)).toMatchSnapshot()
})

test('deserializes list items', () => {
  const text = `
- one
- two
`
  expect(deserialized(text)).toMatchSnapshot()
})

test('deserializes nested list items', () => {
  const text = `
* one
* two
   * nested

next para`
  expect(deserialized(text)).toMatchSnapshot()
})

test('deserializes list surrounded by paragraphs', () => {
  const text = `
first paragraph

- list

second paragraph
`
  expect(deserialized(text)).toMatchSnapshot()
})

test('deserializes indented list items', () => {
  const text = `
 - one
 - two
`
  expect(deserialized(text)).toMatchSnapshot()
})

test('deserializes list items with marks', () => {
  const text = `
 - one **bold**
 - *italic* two
`
  expect(deserialized(text)).toMatchSnapshot()
})

test('deserializes ordered list items', () => {
  const text = `
1. one
1. two
`
  expect(deserialized(text)).toMatchSnapshot()
})

test('deserializes ordered list items with marks', () => {
  const text = `
1. one **bold**
1. *italic* two
`
  expect(deserialized(text)).toMatchSnapshot()
})

test('deserializes ordered list items with different numbers', () => {
  const text = `
1. one
2. two
3. three
`
  expect(deserialized(text)).toMatchSnapshot()
})

test('deserializes mixed list items', () => {
  const text = `
1. list

- another

1. different
`
  expect(deserialized(text)).toMatchSnapshot()
})

test('deserializes tables', () => {
  const text = `
| Tables   |      Are      |  Cool |
|----------|:-------------:|------:|
| col 1 is |  left-aligned | $1600 |
| col 2 is |    centered   |   $12 |
| col 3 is | right-aligned |    $1 |
`
  expect(deserialized(text)).toMatchSnapshot()
})

test('deserializes tables followed by newlines', () => {
  const text = `
| Tables   |      Are      |  Cool |
|----------|:-------------:|------:|
| col 1 is |  left-aligned | $1600 |

a new paragraph
`
  expect(deserialized(text)).toMatchSnapshot()
})

test('deserializes ``` code fences', () => {
  const text = `
\`\`\`
const hello = 'world';
function() {
  return hello;
}
\`\`\`
`
  expect(deserialized(text)).toMatchSnapshot()
})

test('deserializes ``` code fences with language', () => {
  const text = `
\`\`\`javascript
const hello = 'world';
function() {
  return hello;
}
\`\`\`
`
  expect(deserialized(text)).toMatchSnapshot()
})

test('deserializes code followed by newlines', () => {
  const text = `
one sentance

\`\`\`
const hello = 'world';
function() {
  return hello;
}
\`\`\`

two sentance
`
  expect(deserialized(text)).toMatchSnapshot()
})

test('deserializes ~~~ code fences', () => {
  const text = `
~~~
const hello = 'world';
function() {
  return hello;
}
~~~
`
  expect(deserialized(text)).toMatchSnapshot()
})

test('deserializes indented code blocks', () => {
  const text = `
    const hello = 'world';
    function() {
      return hello;
    }
`
  expect(deserialized(text)).toMatchSnapshot()
})

test('deserializes hashtag', () => {
  const text = `this is a #hashtag example`
  expect(deserialized(text)).toMatchSnapshot()
})

test('deserializes hashtag ignoring dash', () => {
  const text = `dash should end #hashtag-dash`
  expect(deserialized(text)).toMatchSnapshot()
})

test('deserializes image', () => {
  const text = `![example](http://example.com/logo.png)`
  expect(deserialized(text)).toMatchSnapshot()
})

test('deserializes image with title', () => {
  const text = `![example](http://example.com/logo.png "image title")`
  expect(deserialized(text)).toMatchSnapshot()
})

test('deserializes link', () => {
  const text = `[google](http://google.com)`
  expect(deserialized(text)).toMatchSnapshot()
})

test('deserializes link within mark', () => {
  const text = `**[google](http://google.com)**`
  expect(deserialized(text)).toMatchSnapshot()
})

test('deserializes link with encoded characters', () => {
  const text = `[kibana](https://example.com/app/kibana#/discover?_g=%28refreshInterval:%28%27$$hashKey%27:%27object:1596%27,display:%2710%20seconds%27,pause:!f,section:1,value:10000%29,time:%28from:now-15m,mode:quick,to:now%29%29&_a=%28columns:!%28metadata.step,message,metadata.attempt_f,metadata.tries_f,metadata.error_class,metadata.url%29,index:%27logs-%27,interval:auto,query:%28query_string:%28analyze_wildcard:!t,query:%27metadata.at:%20Stepper*%27%29%29,sort:!%28time,desc%29%29)`
  expect(deserialized(text)).toMatchSnapshot()
})

test('deserializes link with percent symbol', () => {
  const text = `[kibana](https://example.com/app/kibana#/visualize/edit/Requests-%)`
  expect(deserialized(text)).toMatchSnapshot()
})

test('deserializes empty link', () => {
  const text = `[empty]()`
  expect(deserialized(text)).toMatchSnapshot()
})

test('deserializes empty string', () => {
  expect(deserialized('')).toMatchSnapshot()
})

test('deserializes whitespace string', () => {
  expect(deserialized('   ')).toMatchSnapshot()
})

test('deserializes escaped blocks', () => {
  expect(deserialized('\\# text')).toMatchSnapshot()
  expect(deserialized('\\- text')).toMatchSnapshot()
  expect(deserialized('\\* text')).toMatchSnapshot()
})

test('deserializes escaped marks', () => {
  expect(deserialized('this is \\*\\*not bold\\*\\*')).toMatchSnapshot()
  expect(deserialized('this is \\*not italic\\*')).toMatchSnapshot()
  expect(deserialized('this is \\[not\\]\\(a link\\)')).toMatchSnapshot()
  expect(deserialized('this is \\!\\[not\\]\\(an image\\)')).toMatchSnapshot()
})
