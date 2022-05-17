import handlebars from 'handlebars';
import fs from 'fs';
interface ITemplate {
  [key: string]: string | number;
}

export interface IParseMailTemplate {
  file: string;
  variables: ITemplate;
}

export class handlebarsMailTemplate {
  static async parse({ file, variables }: IParseMailTemplate): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(templateFileContent);
    return parseTemplate(variables);
  }
}
