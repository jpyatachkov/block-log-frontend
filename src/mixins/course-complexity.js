export default {
  data: () => ({
    courseComplexityOptions: [
      {
        value: null,
        text: 'Не задана',
      },
      {
        value: 1,
        text: 'Низкая',
      },
      {
        value: 2,
        text: 'Ниже средней',
      },
      {
        value: 3,
        text: 'Средняя',
      },
      {
        value: 4,
        text: 'Выше средней',
      },
      {
        value: 5,
        text: 'Высокая',
      },
    ],
  }),

  methods: {
    complexityToWord(complexity) {
      let word = this.courseComplexityOptions[complexity];
      return word ? word.text : 'Не задана';
    },
  },
};
