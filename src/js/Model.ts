import $ from 'jquery';
import MarkdownIt from 'markdown-it';
let md = new MarkdownIt({
        html:         true,
        xhtmlOut:     true,
        breaks:       true,
        langPrefix:   'language-',
        linkify:      true
    });

export interface ContentInterface {
    content(): Promise<string> ;
}

export class ContentClass implements ContentInterface {
    name: string;
    configKey: string;
    config: any;
    appendTargetId: string;
    constructor(name: string, configKey: string, configObject: any, appendTargetId: string = "#mainContentCol") {
        this.name = name;
        this.configKey = configKey;
        this.config = configObject[configKey];
        this.appendTargetId = appendTargetId;
    }

    render(): void {
        let title = `## ${this.name}

`;
        this.content().then((content) => {
            $(this.appendTargetId).append(md.render(title).concat(content)) 
        }) ;
    }

    content(): Promise<string> {
        throw new Error('Method not implemented.');
    }
}