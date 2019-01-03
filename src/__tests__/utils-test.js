import { escapeMarkdownChars } from '../utils'

describe('escapeMarkdownChars', () => {
  test('handles headings', () => {
    expect(escapeMarkdownChars('# text')).toEqual('\\# text')
  })

  test('handles unordered list items', () => {
    expect(escapeMarkdownChars('- text')).toEqual('\\- text')
    expect(escapeMarkdownChars('* text')).toEqual('\\* text')
  })

  test('handles bolds', () => {
    expect(escapeMarkdownChars('this is **not bold**')).toEqual(
      'this is \\*\\*not bold\\*\\*'
    )
  })

  test('handles italics', () => {
    expect(escapeMarkdownChars('this is *not italic*')).toEqual(
      'this is \\*not italic\\*'
    )
  })

  test('handles hashtags', () => {
    expect(escapeMarkdownChars('this not a # hashtag')).toEqual(
      'this not a \\# hashtag'
    )

    expect(escapeMarkdownChars('this is a #hashtag-notatag')).toEqual(
      'this is a #hashtag\\-notatag'
    )

    expect(escapeMarkdownChars('this is a #hashtag')).toEqual(
      'this is a #hashtag'
    )
  })

  test('handles links', () => {
    expect(escapeMarkdownChars('this is [not](a link)')).toEqual(
      'this is \\[not\\]\\(a link\\)'
    )
  })

  test('handles images', () => {
    expect(escapeMarkdownChars('this is ![not](an image)')).toEqual(
      'this is \\!\\[not\\]\\(an image\\)'
    )
  })

  test('handles ordered list items', () => {
    expect(escapeMarkdownChars(' 1a. item.')).toEqual(' 1a\\. item.')
  })

  test('does not escape links', () => {
    expect(escapeMarkdownChars('https://github.com/')).toEqual(
      'https://github.com/'
    )
  })
})
