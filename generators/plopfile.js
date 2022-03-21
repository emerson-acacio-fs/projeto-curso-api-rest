// eslint-disable-next-line no-undef
module.exports = function (plop) {
  // controller generator
  plop.setGenerator('controller', {
    description: 'application controller logic',
    prompts: [
      {
        type: 'input',
        name: 'route',
        message: 'controller route',
      },
      {
        type: 'input',
        name: 'type',
        message: 'controller type',
      },
    ],
    actions: () => {
      return [
        {
          type: 'modify',
          path: '../src/shared/http/routes/index.ts',
          pattern: /(\/\/--- ADD NEW ROUTE ---)/gi,
          templateFile: 'templates/part.js.hbs',
        },
      ];
    },
  });
};
