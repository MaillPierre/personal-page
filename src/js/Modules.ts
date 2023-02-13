import $ from 'jquery';

interface ContentInterface {
    render(): void ;
}

class ContentClass implements ContentInterface {
    name: string;
    configKey: string;
    config: any;
    constructor(name: string, configKey: string, configObject: any) {
        this.name = name;
        this.configKey = configKey;
        this.config = configObject[configKey];
    }
    render(): void {
        throw new Error('Method not implemented.');
    }
}

export class ContentPerson extends ContentClass {
    name: string;
    configKey: string;
    config: any;
    constructor(configObject: any) {
        super("Person", "Person", configObject);
    }
    render() {
        console.log("Render Social")
        let personName = this.config['name'];
        $("#titleHeader").html(personName);
    }
}

export class ContentSocial extends ContentClass {
    constructor(configObject: any) {
        super("Social", "Social", configObject);
    }
    render() {
        console.log("Render Social")
        let socialDiv = $(`<div class="container">
        </div>`);
        if (this.config.twitter !== undefined && this.config.twitter !== "") {
            socialDiv.append(`<a href="${this.config.twitter}"><i class="bi bi-twitter"></i></a>`);
        }
        if (this.config.github !== undefined && this.config.github !== "") {
            socialDiv.append(`<a href="${this.config.github}"><i class="bi bi-github"></i></a>`);
        }
        if (this.config.mastodon !== undefined && this.config.mastodon !== "") {
            socialDiv.append(`<a href="${this.config.mastodon}"><i class="bi bi-mastodon"></i></a>`);
        }
        $("#mainContentCol").append(socialDiv);
    }
}