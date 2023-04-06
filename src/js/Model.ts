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
    content(): string ;
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
        $(this.appendTargetId).append(md.render(title).concat(this.content())) ;
    }

    content(): string {
        throw new Error('Method not implemented.');
    }
}