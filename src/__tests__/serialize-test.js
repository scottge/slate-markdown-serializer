import MarkdownRenderer from '../renderer'
const Markdown = new MarkdownRenderer()

function reserialized(text) {
  return Markdown.serialize(Markdown.deserialize(text))
}

test('serializes paragraph', () => {
  const text = 'This is just a sentance'
  expect(reserialized(text)).toMatchSnapshot()
})

test('serializes one paragraph', () => {
  const text = `
This is the first sentance
This is the second sentance
`
  expect(reserialized(text)).toMatchSnapshot()
})

test('serializes two paragraphs', () => {
  const text = `
This is the first sentance

This is the second sentance
`
  expect(reserialized(text)).toMatchSnapshot()
})

test('serializes two paragraphs seperated by multiple blank lines', () => {
  const text = `
This is the first sentance


This is the second sentance
`
  expect(reserialized(text)).toMatchSnapshot()
})

test('serializes heading1', () => {
  const text = `# Heading`
  expect(reserialized(text)).toMatchSnapshot()
})

test('serializes heading2', () => {
  const text = `## Heading`
  expect(reserialized(text)).toMatchSnapshot()
})

test('serializes heading3', () => {
  const text = `### Heading`
  expect(reserialized(text)).toMatchSnapshot()
})

test('serializes heading4', () => {
  const text = `#### Heading`
  expect(reserialized(text)).toMatchSnapshot()
})

test('serializes heading5', () => {
  const text = `##### Heading`
  expect(reserialized(text)).toMatchSnapshot()
})

test('serializes heading6', () => {
  const text = `###### Heading`
  expect(reserialized(text)).toMatchSnapshot()
})


test('serializes headings followed by newlines', () => {
  const text = `
a paragraph

## Heading

another paragraph
`
  expect(reserialized(text)).toMatchSnapshot()
})


test('serializes horizontal rule', () => {
  const text = `
---

a paragraph
`
  expect(reserialized(text)).toMatchSnapshot()
})

test('bold mark', () => {
  const text = `**this is bold**`
  expect(reserialized(text)).toMatchSnapshot()
})

test('italic mark', () => {
  const text = `*this is italic* _this is italic too_`
  expect(reserialized(text)).toMatchSnapshot()
})

test('deleted mark', () => {
  const text = `~~this is strikethrough~~`
  expect(reserialized(text)).toMatchSnapshot()
})

test('inserted mark', () => {
  const text = `++inserted text++`
  expect(reserialized(text)).toMatchSnapshot()
})

test('underlined mark', () => {
  const text = `__underlined text__`
  expect(reserialized(text)).toMatchSnapshot()
})

test('code mark', () => {
  const text = '`const foo = 123;`'
  expect(reserialized(text)).toMatchSnapshot()
})

test('code mark with escaped characters', () => {
  const text = "`<script>alert('foo')</script>`"
  expect(reserialized(text)).toMatchSnapshot()
})

test('serializes quote', () => {
  const text = `
> this is a quote
`
  expect(reserialized(text)).toMatchSnapshot()
})

test('serializes quote followed by list with quote', () => {
  const text = `
> this is a quote
1. > this is a list item
`
  expect(reserialized(text)).toMatchSnapshot()
})

test('serializes quotes separated by newlines', () => {
  const text = `
> this is a quote

> this is a different quote
`
  expect(reserialized(text)).toMatchSnapshot()
})

test('serializes quote followed by newlines', () => {
  const text = `
> this is a quote

this is a paragraph
`
  expect(reserialized(text)).toMatchSnapshot()
})

test('serializes list items', () => {
  const text = `
- one
- two
`
  expect(reserialized(text)).toMatchSnapshot()
})

test('serializes nested list items', () => {
  const text = `
* one
* two
   * nested

next para`
  expect(reserialized(text)).toMatchSnapshot()
})

test('serializes list surrounded by paragraphs', () => {
  const text = `
first paragraph

- list

second paragraph
`
  expect(reserialized(text)).toMatchSnapshot()
})

test('serializes indented list items', () => {
  const text = `
 - one
 - two
`
  expect(reserialized(text)).toMatchSnapshot()
})

test('serializes list items with marks', () => {
  const text = `
 - one **bold**
 - *italic* two
`
  expect(reserialized(text)).toMatchSnapshot()
})

test('serializes ordered list items', () => {
  const text = `
1. one
1. two
`
  expect(reserialized(text)).toMatchSnapshot()
})

test('serializes ordered list items with marks', () => {
  const text = `
1. one **bold**
1. *italic* two
`
  expect(reserialized(text)).toMatchSnapshot()
})

test('serializes ordered list items with different numbers', () => {
  const text = `
1. one
2. two
3. three
`
  expect(reserialized(text)).toMatchSnapshot()
})

test('serializes mixed list items', () => {
  const text = `
1. list

- another

1. different
`
  expect(reserialized(text)).toMatchSnapshot()
})

test('serializes tables', () => {
  const text = `
| Tables   |      Are      |  Cool |
|----------|:-------------:|------:|
| col 1 is |  left-aligned | $1600 |
| col 2 is |    centered   |   $12 |
| col 3 is | right-aligned |    $1 |
`
  expect(reserialized(text)).toMatchSnapshot()
})

test('serializes tables followed by newlines', () => {
  const text = `
| Tables   |      Are      |  Cool |
|----------|:-------------:|------:|
| col 1 is |  left-aligned | $1600 |

a new paragraph
`
  expect(reserialized(text)).toMatchSnapshot()
})

test('serializes ``` code fences', () => {
  const text = `
\`\`\`
const hello = 'world';
function() {
  return hello;
}
\`\`\`
`
  expect(reserialized(text)).toMatchSnapshot()
})

test('serializes ``` code fences with language', () => {
  const text = `
\`\`\`javascript
const hello = 'world';
function() {
  return hello;
}
\`\`\`
`
  expect(reserialized(text)).toMatchSnapshot()
})

test('seserializes ``` code fences with escaped characters', () => {
  const text = `
\`\`\`
const hello = 'world';
function() {
  return hello;
}
\`\`\`
`
  expect(reserialized(text)).toMatchSnapshot()
})

test('serializes code followed by newlines', () => {
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
  expect(reserialized(text)).toMatchSnapshot()
})

test('serializes ~~~ code fences', () => {
  const text = `
~~~
const hello = 'world';
function() {
  return hello;
}
~~~
`
  expect(reserialized(text)).toMatchSnapshot()
})

test('serializes indented code blocks', () => {
  const text = `
    const hello = 'world';
    function() {
      return hello;
    }
`
  expect(reserialized(text)).toMatchSnapshot()
})

test('serializes hashtag', () => {
  const text = `this is a #hashtag example`
  expect(reserialized(text)).toMatchSnapshot()
})

test('serializes hashtag ignoring dash', () => {
  const text = `dash should end #hashtag-dash`
  expect(reserialized(text)).toMatchSnapshot()
})

test('serializes image', () => {
  const text = `![example](http://example.com/logo.png)`
  expect(reserialized(text)).toMatchSnapshot()
})

test('serializes image with title', () => {
  const text = `![example](http://example.com/logo.png "image title")`
  expect(reserialized(text)).toMatchSnapshot()
})

test('serializes link', () => {
  const text = `[google](http://google.com)`
  expect(reserialized(text)).toMatchSnapshot()
})

test('serializes link within mark', () => {
  const text = `**[google](http://google.com)**`
  expect(reserialized(text)).toMatchSnapshot()
})

test('serializes link with encoded characters', () => {
  const text = `[kibana](https://example.com/app/kibana#/discover?_g=%28refreshInterval:%28%27$$hashKey%27:%27object:1596%27,display:%2710%20seconds%27,pause:!f,section:1,value:10000%29,time:%28from:now-15m,mode:quick,to:now%29%29&_a=%28columns:!%28metadata.step,message,metadata.attempt_f,metadata.tries_f,metadata.error_class,metadata.url%29,index:%27logs-%27,interval:auto,query:%28query_string:%28analyze_wildcard:!t,query:%27metadata.at:%20Stepper*%27%29%29,sort:!%28time,desc%29%29)`
  expect(reserialized(text)).toMatchSnapshot()
})

test('serializes link with percent symbol', () => {
  const text = `[kibana](https://example.com/app/kibana#/visualize/edit/Requests-%)`
  expect(reserialized(text)).toMatchSnapshot()
})

test('serializes empty link', () => {
  const text = `[empty]()`
  expect(reserialized(text)).toMatchSnapshot()
})

test('serializes empty string', () => {
  expect(reserialized('')).toMatchSnapshot()
})

test('serializes whitespace string', () => {
  expect(reserialized('   ')).toMatchSnapshot()
})

test('serializes escaped blocks', () => {
  expect(reserialized('\\# text')).toMatchSnapshot()
  expect(reserialized('\\- text')).toMatchSnapshot()
  expect(reserialized('\\* text')).toMatchSnapshot()
})

test('serializes escaped marks', () => {
  expect(reserialized('this is \\*\\*not bold\\*\\*')).toMatchSnapshot()
  expect(reserialized('this is \\*not italic\\*')).toMatchSnapshot()
  expect(reserialized('this is \\[not\\]\\(a link\\)')).toMatchSnapshot()
  expect(reserialized('this is \\!\\[not\\]\\(an image\\)')).toMatchSnapshot()
})
