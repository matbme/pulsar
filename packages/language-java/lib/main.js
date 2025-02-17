exports.activate = () => {
  const TODO_PATTERN = /\b(TODO|FIXME|CHANGED|XXX|IDEA|HACK|NOTE|REVIEW|NB|BUG|QUESTION|COMBAK|TEMP|DEBUG|OPTIMIZE|WARNING)\b/;
  const HYPERLINK_PATTERN = /\bhttps?:/

  atom.grammars.addInjectionPoint('source.java', {
    type: 'comment',
    language: (node) => {
      return TODO_PATTERN.test(node.text) ? 'todo' : undefined;
    },
    content: (node) => node,
    languageScope: null
  });

  for (let type of ['string_literal', 'comment']) {
    atom.grammars.addInjectionPoint('source.java', {
      type,
      language: (node) => {
        return HYPERLINK_PATTERN.test(node.text) ? 'hyperlink' : undefined;
      },
      content: (node) => node,
      languageScope: null
    });
  }
};
