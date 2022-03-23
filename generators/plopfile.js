// eslint-disable-next-line no-undef
module.exports = function (plop) {
  // controller generator
  plop.setGenerator('controller', {
    description: 'application controller logic',
    prompts: [
      {
        type: 'input',
        name: 'route',
        message: 'Enter the new route: ',
      },
      {
        type: 'list',
        name: 'type',
        message: 'Select the request type: ',
        choices: [
          { name: 'GET', value: 'get', checked: true },
          { name: 'POST', value: 'post' },
          { name: 'DELETE', value: 'delete' },
          { name: 'PUT', value: 'put' },
        ],
      },
    ],
    actions: () => {
      return [
        {
          type: 'modify',
          path: '../src/shared/http/routes/index.ts',
          pattern:
            /(\/\/--- ADD NEW ROUTE --- tag used in plop.js DON'T REMOVE THIS LINE)/gi,
          templateFile: 'templates/part.js.hbs',
        },
      ];
    },
  });
};
