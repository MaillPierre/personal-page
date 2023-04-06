import $ from 'jquery';
import { ContentClass } from './Model';
import MarkdownIt from 'markdown-it';
let md = new MarkdownIt({
        html:         true,
        xhtmlOut:     true,
        breaks:       true,
        langPrefix:   'language-',
        linkify:      true
    });
import EventEmitter from 'events';
// md.use(markdownItImageSize);

export class ContentPerson extends ContentClass {
    name: string;
    configKey: string;
    config: any;
    constructor(configObject: any) {
        super("", "person", configObject, "#titleHeader");
    }

    content() {
        let personName = this.config['name'];
        return md.render(`# ${personName}`)
    }
}

export class ContentSocial extends ContentClass {
    constructor(configObject: any) {
        super("Social", "social", configObject);
    }
    content() {
        
        let content = "";
        if(this.config.website !== undefined && this.config.website !== "") {
            content = content.concat(`[![Website logo](https://icons.getbootstrap.com/assets/icons/globe.svg) Website](${this.config.website}) `);
        }
        if(this.config.blog !== undefined && this.config.blog !== "") {
            content = content.concat(`[![Blog logo](https://icons.getbootstrap.com/assets/icons/journal-text.svg) Blog](${this.config.blog}) `);
        }
        if (this.config.email !== undefined && this.config.email !== "") {
            content = content.concat(`[![Email logo](https://icons.getbootstrap.com/assets/icons/envelope-fill.svg) Email](${this.config.email}) `);
        }
        if (this.config.twitter !== undefined && this.config.twitter !== "") {
            content = content.concat(`[![Twitter logo](https://icons.getbootstrap.com/assets/icons/twitter.svg) Twitter](${this.config.twitter}) `);
        }
        if (this.config.github !== undefined && this.config.github !== "") {
            content = content.concat(`[![Github logo](https://icons.getbootstrap.com/assets/icons/github.svg) GitHub](${this.config.github}) `);
        }
        if (this.config.mastodon !== undefined && this.config.mastodon !== "") {
            content = content.concat(`[![Mastodon logo](https://icons.getbootstrap.com/assets/icons/mastodon.svg) Mastodon](${this.config.mastodon}) `);
        }
        if (this.config.linkedin !== undefined && this.config.linkedin !== "") {
            content = content.concat(`[![LinkedIn logo](https://icons.getbootstrap.com/assets/icons/linkedin.svg) LinkedIn](${this.config.linkedin}) `);
        }
        if (this.config.orcid !== undefined && this.config.orcid !== "") {
            content = content.concat(`[![ORCID logo](https://info.orcid.org/wp-content/uploads/2020/12/orcid_16x16.gif) ORCID](${this.config.orcid}) `);
        }
        // if (this.config.hal !== undefined && this.config.hal !== "") {
        //     content = content.concat(`[![HAL Id logo](https://cv.hal.science/assets/img/idhal.svg) HAL](${this.config.hal}) `);
        // }        
        if(this.config.instagram !== undefined && this.config.instagram !== "") {
            content = content.concat(`[![Instagram logo](https://icons.getbootstrap.com/assets/icons/instagram.svg) Instagram](${this.config.instagram}) `);
        }
        if(this.config.facebook !== undefined && this.config.facebook !== "") {
            content = content.concat(`[![Facebook logo](https://icons.getbootstrap.com/assets/icons/facebook.svg) Facebook](${this.config.facebook}) `);
        }
        if(this.config.youtube !== undefined && this.config.youtube !== "") {
            content = content.concat(`[![YouTube logo](https://icons.getbootstrap.com/assets/icons/youtube.svg) YouTube](${this.config.youtube}) `);
        }
        if(this.config.twitch !== undefined && this.config.twitch !== "") {
            content = content.concat(`[![Twitch logo](https://icons.getbootstrap.com/assets/icons/twitch.svg) Twitch](${this.config.twitch}) `);
        }
        if(this.config.patreon !== undefined && this.config.patreon !== "") {
            content = content.concat(`[![Patreon logo](https://icons.getbootstrap.com/assets/icons/patreon.svg) Patreon](${this.config.patreon}) `);
        }
        if(this.config.paypal !== undefined && this.config.paypal !== "") {
            content = content.concat(`[![PayPal logo](https://icons.getbootstrap.com/assets/icons/paypal.svg) PayPal](${this.config.paypal}) `);
        }
        if(this.config.bitcoin !== undefined && this.config.bitcoin !== "") {
            content = content.concat(`[![Bitcoin logo](https://icons.getbootstrap.com/assets/icons/bitcoin.svg) Bitcoin](${this.config.bitcoin}) `);
        }
        if(this.config.ethereum !== undefined && this.config.ethereum !== "") {
            content = content.concat(`[![Ethereum logo](https://icons.getbootstrap.com/assets/icons/ethereum.svg) Ethereum](${this.config.ethereum}) `);
        }
        if(this.config.monero !== undefined && this.config.monero !== "") {
            content = content.concat(`[![Monero logo](https://icons.getbootstrap.com/assets/icons/monero.svg) Monero](${this.config.monero}) `);
        }
        if(this.config.flattr !== undefined && this.config.flattr !== "") {
            content = content.concat(`[![Flattr logo](https://icons.getbootstrap.com/assets/icons/flattr.svg) Flattr](${this.config.flattr}) `);
        }
        if(this.config.liberapay !== undefined && this.config.liberapay !== "") {
            content = content.concat(`[![Liberapay logo](https://icons.getbootstrap.com/assets/icons/liberapay.svg) Liberapay](${this.config.liberapay}) `);
        }
        if(this.config.buymeacoffee !== undefined && this.config.buymeacoffee !== "") {
            content = content.concat(`[![Buy me a coffee logo](https://icons.getbootstrap.com/assets/icons/buymeacoffee.svg) Buy me a coffee](${this.config.buymeacoffee}) `);
        }
        if(this.config.open_collective !== undefined && this.config.open_collective !== "") {
            content = content.concat(`[![Open Collective logo](https://icons.getbootstrap.com/assets/icons/open-collective.svg) Open Collective](${this.config.open_collective}) `);
        }
        if(this.config.ko_fi !== undefined && this.config.ko_fi !== "") {
            content = content.concat(`[![Ko-fi logo](https://icons.getbootstrap.com/assets/icons/ko-fi.svg) Ko-fi](${this.config.ko_fi}) `);
        }
        if(this.config.reddit !== undefined && this.config.reddit !== "") {
            content = content.concat(`[![Reddit logo](https://icons.getbootstrap.com/assets/icons/reddit.svg) Reddit](${this.config.reddit}) `);
        }
        if(this.config.whatsapp !== undefined && this.config.whatsapp !== "") {
            content = content.concat(`[![WhatsApp logo](https://icons.getbootstrap.com/assets/icons/whatsapp.svg) WhatsApp](${this.config.whatsapp}) `);
        }
        if(this.config.telegram !== undefined && this.config.telegram !== "") {
            content = content.concat(`[![Telegram logo](https://icons.getbootstrap.com/assets/icons/telegram.svg) Telegram](${this.config.telegram}) `);
        }
        if(this.config.discord !== undefined && this.config.discord !== "") {
            content = content.concat(`[![Discord logo](https://icons.getbootstrap.com/assets/icons/discord.svg) Discord](${this.config.discord}) `);
        }
        if(this.config.slack !== undefined && this.config.slack !== "") {
            content = content.concat(`[![Slack logo](https://icons.getbootstrap.com/assets/icons/slack.svg) Slack](${this.config.slack}) `);
        }
        if(this.config.affiliation !== undefined && this.config.affiliation !== "") {
            content = content.concat(`
Affiliation: ${this.config.affiliation} `);
        }

        return md.render(content);
    }
}

export class ContentPublications extends ContentClass {
    constructor(configObject: any) {
        super("Publications", "publication", configObject);
    }

    content(): string {
        let content = "";
        return md.render(content);
    }
}