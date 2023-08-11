import * as $rdf from 'rdflib';
import * as Logger from './LogUtils';
import * as RDFUtil from './RDFUtils';
import { ContentClass } from './Model';
import * as Query from './QueryUtils';
import * as Global from './GlobalUtils';
import MarkdownIt from 'markdown-it';
import { SubjectType } from 'rdflib/lib/types';
let md = new MarkdownIt({
    html: true,
    xhtmlOut: true,
    breaks: true,
    langPrefix: 'language-',
    linkify: true
});
// md.use(markdownItImageSize);

export class ContentPerson extends ContentClass {
    constructor(configObject: any) {
        super("", "person", configObject, "#titleHeader");
    }

    content() {
        let personName = this.config['name'];
        return Promise.resolve(md.render(`# ${personName}`));
    }
}

export class ContentSocial extends ContentClass {
    constructor(configObject: any) {
        super("", "social", configObject, "#socialInfo");
    }
    content() {

        let content = "";
        if (this.config.website !== undefined && this.config.website !== "") {
            content = content.concat(`[<img src="https://icons.getbootstrap.com/assets/icons/globe.svg" alt="Website logo" class="icon-image"> Website](${this.config.website}) `);
        }
        if (this.config.blog !== undefined && this.config.blog !== "") {
            content = content.concat(`[<img src="https://icons.getbootstrap.com/assets/icons/journal-text.svg" alt="Blog logo" class="icon-image"> Blog](${this.config.blog}) `);
        }
        if (this.config.email !== undefined && this.config.email !== "") {
            content = content.concat(`[<img src="https://icons.getbootstrap.com/assets/icons/envelope-fill.svg" alt="Email logo" class="icon-image"> Email](mailto:${this.config.email}) `);
        }
        if (this.config.twitter !== undefined && this.config.twitter !== "") {
            content = content.concat(`[<img src="https://icons.getbootstrap.com/assets/icons/twitter.svg" alt="Twitter logo" class="icon-image"> Twitter](https://twitter.com/${this.config.twitter}) `);
        }
        if (this.config.github !== undefined && this.config.github !== "") {
            content = content.concat(`[<img src="https://icons.getbootstrap.com/assets/icons/github.svg" alt="Github logo" class="icon-image"> GitHub](https://github.com/${this.config.github}) `);
        }
        if (this.config.mastodon !== undefined && this.config.mastodon !== "") {
            content = content.concat(`[<img src="https://icons.getbootstrap.com/assets/icons/mastodon.svg" alt="Mastodon logo" class="icon-image"> Mastodon](https://social.linux.pizza/${this.config.mastodon}) `);
        }
        if (this.config.linkedin !== undefined && this.config.linkedin !== "") {
            content = content.concat(`[<img src="https://icons.getbootstrap.com/assets/icons/linkedin.svg" alt="LinkedIn logo" class="icon-image"> LinkedIn](https://www.linkedin.com/in/${this.config.linkedin}) `);
        }
        if (this.config.orcid !== undefined && this.config.orcid !== "") {
            content = content.concat(`[<img src="https://info.orcid.org/wp-content/uploads/2020/12/orcid_16x16.gif" alt="ORCID logo" class="icon-image"> ORCiD](https://orcid.org/${this.config.orcid}) `);
        }
        if (this.config.dblp !== undefined && this.config.dblp !== "") {
            content = content.concat(`[<img src="https://dblp.org/img/dblp.icon.192x192.png" alt="DBLP logo" class="icon-image"> DBLP](https://dblp.org/pid/${this.config.dblp}) `);
        }
        if (this.config.hal !== undefined && this.config.hal !== "") {
            content = content.concat(`[<img src="https://cv.hal.science/assets/img/idhal.svg" alt="HAL Id logo" class="icon-image"> HAL](https://cv.hal.science/${this.config.hal}) `);
        }
        if (this.config.gscholar !== undefined && this.config.gscholar !== "") {
            content = content.concat(`[<img src="https://icons.getbootstrap.com/assets/icons/google.svg" alt="Google Scholar logo" class="icon-image"> Google Scholar](https://scholar.google.com/citations?user=${this.config.gscholar}) `);
        }
        if (this.config.instagram !== undefined && this.config.instagram !== "") {
            content = content.concat(`[<img src="https://icons.getbootstrap.com/assets/icons/instagram.svg" alt="Instagram logo" class="icon-image"> Instagram](https://www.instagram.com/${this.config.instagram}) `);
        }
        if (this.config.facebook !== undefined && this.config.facebook !== "") {
            content = content.concat(`[<img src="https://icons.getbootstrap.com/assets/icons/facebook.svg" alt="Facebook logo" class="icon-image"> Facebook](${this.config.facebook}) `);
        }
        if (this.config.youtube !== undefined && this.config.youtube !== "") {
            content = content.concat(`[<img src="https://icons.getbootstrap.com/assets/icons/youtube.svg" alt="YouTube logo" class="icon-image"> YouTube](${this.config.youtube}) `);
        }
        if (this.config.twitch !== undefined && this.config.twitch !== "") {
            content = content.concat(`[<img src="https://icons.getbootstrap.com/assets/icons/twitch.svg" alt="Twitch logo" class="icon-image"> Twitch](${this.config.twitch}) `);
        }
        if (this.config.patreon !== undefined && this.config.patreon !== "") {
            content = content.concat(`[<img src="https://icons.getbootstrap.com/assets/icons/patreon.svg" alt="Patreon logo" class="icon-image"> Patreon](https://patreon.com/${this.config.patreon}) `);
        }
        if (this.config.paypal !== undefined && this.config.paypal !== "") {
            content = content.concat(`[<img src="https://icons.getbootstrap.com/assets/icons/paypal.svg" alt="PayPal logo" class="icon-image"> PayPal](${this.config.paypal}) `);
        }
        if (this.config.bitcoin !== undefined && this.config.bitcoin !== "") {
            content = content.concat(`[<img src="https://icons.getbootstrap.com/assets/icons/bitcoin.svg" alt="Bitcoin logo" class="icon-image"> Bitcoin](${this.config.bitcoin}) `);
        }
        if (this.config.ethereum !== undefined && this.config.ethereum !== "") {
            content = content.concat(`[<img src="https://icons.getbootstrap.com/assets/icons/ethereum.svg" alt="Ethereum logo" class="icon-image"> Ethereum](${this.config.ethereum}) `);
        }
        if (this.config.monero !== undefined && this.config.monero !== "") {
            content = content.concat(`[<img src="https://icons.getbootstrap.com/assets/icons/monero.svg" alt="Monero logo" class="icon-image"> Monero](${this.config.monero}) `);
        }
        if (this.config.flattr !== undefined && this.config.flattr !== "") {
            content = content.concat(`[<img src="https://icons.getbootstrap.com/assets/icons/flattr.svg" alt="Flattr logo" class="icon-image"> Flattr](${this.config.flattr}) `);
        }
        if (this.config.liberapay !== undefined && this.config.liberapay !== "") {
            content = content.concat(`[<img src="https://icons.getbootstrap.com/assets/icons/liberapay.svg" alt="Liberapay logo" class="icon-image"> Liberapay](${this.config.liberapay}) `);
        }
        if (this.config.buymeacoffee !== undefined && this.config.buymeacoffee !== "") {
            content = content.concat(`[<img src="https://icons.getbootstrap.com/assets/icons/buymeacoffee.svg" alt="Buy me a coffee logo" class="icon-image"> Buy me a coffee](${this.config.buymeacoffee}) `);
        }
        if (this.config.open_collective !== undefined && this.config.open_collective !== "") {
            content = content.concat(`[<img src="https://icons.getbootstrap.com/assets/icons/open-collective.svg" alt="Open Collective logo" class="icon-image"> Open Collective](${this.config.open_collective}) `);
        }
        if (this.config.ko_fi !== undefined && this.config.ko_fi !== "") {
            content = content.concat(`[<img src="https://icons.getbootstrap.com/assets/icons/ko-fi.svg" alt="Ko-fi logo" class="icon-image"> Ko-fi](${this.config.ko_fi}) `);
        }
        if (this.config.reddit !== undefined && this.config.reddit !== "") {
            content = content.concat(`[<img src="https://icons.getbootstrap.com/assets/icons/reddit.svg" alt="Reddit logo" class="icon-image"> Reddit](https://www.reddit.com/${this.config.reddit}) `);
        }
        if (this.config.whatsapp !== undefined && this.config.whatsapp !== "") {
            content = content.concat(`[<img src="https://icons.getbootstrap.com/assets/icons/whatsapp.svg" alt="WhatsApp logo" class="icon-image"> WhatsApp](${this.config.whatsapp}) `);
        }
        if (this.config.telegram !== undefined && this.config.telegram !== "") {
            content = content.concat(`[<img src="https://icons.getbootstrap.com/assets/icons/telegram.svg" alt="Telegram logo" class="icon-image"> Telegram](${this.config.telegram}) `);
        }
        if (this.config.discord !== undefined && this.config.discord !== "") {
            content = content.concat(`[<img src="https://icons.getbootstrap.com/assets/icons/discord.svg" alt="Discord logo" class="icon-image"> Discord](${this.config.discord}) `);
        }
        if (this.config.slack !== undefined && this.config.slack !== "") {
            content = content.concat(`[<img src="https://icons.getbootstrap.com/assets/icons/slack.svg" alt="Slack logo" class="icon-image"> Slack](${this.config.slack}) `);
        }
        if (this.config.affiliation !== undefined && this.config.affiliation !== "") {
            content = content.concat(`
Affiliation: ${this.config.affiliation} `);
        }

        return Promise.resolve(md.render(content));
    }
}

type authorObject = {
    name: string,
    orcid: string,
    order: number
}

type articleObject = {
    types: $rdf.NamedNode[],
    title: string,
    authors: authorObject[],
    year: string,
    month: string,
    venue: string,
    doi: string
};

type biblioObject = {
    journalArticle: articleObject[],
    conferenceArticle: articleObject[],
    informalArticle: articleObject[]
}

export class ContentPublications extends ContentClass {
    idDBLP: string;
    dblpData: $rdf.Store;
    dblpDataLoadingPromise: Promise<void>;
    dblpAuthorURI: string;

    constructor(configObject: any) {
        super("Publications", "dblp", configObject);
        this.idDBLP = configObject.publications.dblp;
        this.dblpData = RDFUtil.createStore();
        this.dblpDataLoadingPromise = Query.fetchGETPromise(`https://dblp.org/pid/${this.idDBLP}.ttl`).then((dataString) => {
            RDFUtil.parseTurtleToStore(dataString, this.dblpData, `https://dblp.org/pid/${this.idDBLP}.ttl`);
        }).catch((error) => {
            Logger.log("error", "Error loading HAL data: " + error);
        });
    }

    private generateData() {
        let authorOrcidMap = new Map<string, string>();
        return this.dblpDataLoadingPromise.then(() => {
            let biblioObject: biblioObject = {
                journalArticle: [],
                conferenceArticle: [],
                informalArticle: []
            }

            let articlesNodes = this.dblpData.statementsMatching(undefined, RDFUtil.DBLP("authorOf"), undefined).map(statement => statement.object);
            return Promise.allSettled(articlesNodes.filter(articleNode => $rdf.isNamedNode(articleNode)).map((articleNode) => {
                return Query.fetchGETPromise(`${articleNode.value}.ttl`).then(articleDataString => {
                    return RDFUtil.parseTurtleToStore(articleDataString, this.dblpData, `${articleNode.value}.ttl`)
                })
            })).then(() => {

                function extractArticleArray(articleType: string, dblpData: $rdf.Store): articleObject[] {
                    let typedArticlesNodes = dblpData.statementsMatching(undefined, RDFUtil.RDF("type"), RDFUtil.DBLP(articleType)).map((statement) => { return statement.subject });

                    return typedArticlesNodes.map((articleNode) => {
                        let articleObject: articleObject = {
                            types: [],
                            title: "",
                            authors: [],
                            year: "",
                            month: "",
                            venue: "",
                            doi: ""
                        };

                        dblpData.statementsMatching(articleNode as SubjectType, RDFUtil.RDF("type"), undefined).forEach((statement) => {
                            articleObject.types.push(statement.object as $rdf.NamedNode);
                        })
                        dblpData.statementsMatching(articleNode as SubjectType, RDFUtil.DBLP("title"), undefined).forEach((statement) => {
                            articleObject.title = decodeURIComponent(statement.object.value);
                        })
                        dblpData.statementsMatching(articleNode as SubjectType, RDFUtil.DBLP("doi"), undefined).forEach((statement) => {
                            articleObject.doi = statement.object.value;
                        })
                        dblpData.statementsMatching(articleNode as SubjectType, RDFUtil.DBLP("publishedIn"), undefined).forEach((statement) => {
                            articleObject.venue = decodeURIComponent(statement.object.value);
                        })
                        dblpData.statementsMatching(articleNode as SubjectType, RDFUtil.DBLP("yearOfPublication"), undefined).forEach((statement) => {
                            articleObject.year = statement.object.value;
                        })
                        dblpData.statementsMatching(articleNode as SubjectType, RDFUtil.DBLP("monthOfPublication"), undefined).forEach((statement) => {
                            articleObject.month = statement.object.value;
                        })

                        dblpData.statementsMatching(articleNode as SubjectType, RDFUtil.DBLP("hasSignature"), undefined).forEach((statement) => {
                            let signatureNode = statement.object as $rdf.BlankNode;
                            let authorObject: authorObject = {
                                name: "",
                                orcid: "",
                                order: 0
                            }

                            dblpData.statementsMatching(signatureNode, RDFUtil.DBLP("signatureDblpName"), undefined).forEach((statement) => {
                                authorObject.name = decodeURIComponent(statement.object.value);
                            })
                            dblpData.statementsMatching(signatureNode, RDFUtil.DBLP("signatureOrcid"), undefined).forEach((statement) => {
                                authorOrcidMap.set(authorObject.name, statement.object.value);
                            })
                            dblpData.statementsMatching(signatureNode, RDFUtil.DBLP("signatureOrdinal"), undefined).forEach((statement) => {
                                authorObject.order = parseInt(statement.object.value);
                            })

                            articleObject.authors.push(authorObject);

                        })

                        articleObject.authors.sort((a, b) => {
                            return a.order - b.order;
                        })

                        return articleObject;
                    })
                }

                biblioObject.journalArticle = extractArticleArray("Article", this.dblpData).sort((a, b) => {
                    return parseInt(b.year) - parseInt(a.year);
                });
                biblioObject.conferenceArticle = extractArticleArray("Inproceedings", this.dblpData).sort((a, b) => {
                    return parseInt(b.year) - parseInt(a.year);
                });
                biblioObject.informalArticle = extractArticleArray("Informal", this.dblpData).sort((a, b) => {
                    return parseInt(b.year) - parseInt(a.year);
                });

                return biblioObject;
            }).then(biblioObject => {

                function articleListToString(articleList): string {
                    return articleList.map((articleObject) => {
                        let authors = articleObject.authors.map((author) => {
                            if (authorOrcidMap.get(author.name) !== "" && authorOrcidMap.get(author.name) !== undefined) {
                                return `[${author.name}](${authorOrcidMap.get(author.name)})`;
                            } else {
                                return author.name;
                            }
                        }).join(", ");
                        return `* [**${articleObject.title}**](${articleObject.doi}), ${authors}. ${articleObject.venue}, ${articleObject.month} ${articleObject.year}`;
                    }).join("\n")
                }

                return `### Journal articles\n\n${articleListToString(biblioObject.journalArticle)}\n\n### Conference articles\n\n ${articleListToString(biblioObject.conferenceArticle)}\n\n### Informal articles\n\n${articleListToString(biblioObject.informalArticle)}`;
            }).then(result => {
                let doiList: string[] = this.dblpData.statementsMatching(undefined, RDFUtil.DBLP("doi"), undefined).map((statement) => {
                    return statement.object.value;
                });
                doiList = doiList.filter((doi, index) => {
                    return doi.startsWith("https://doi.org/");
                });

                let keywordMap = new Map<string, string[]>();

                return Promise.allSettled(doiList.map((doi) => {
                    return Query.fetchJSONPromise(`https://api.openalex.org/works/${doi}`).then((data: Global.JSONValue) => {
                        if(data["concepts"] != undefined) {
                            let concepts = [];
                            data["concepts"].forEach((concept) => {
                                if(concept["score"] > 0.5) {
                                    concepts.push(concept["display_name"]);
                                }
                            })
                            keywordMap.set(doi, concepts);
                        }
                    });
                })).then(() => {
                    let keywordSet: Set<string> = new Set<string>();
                    let keywordCountMap = new Map<string, number>();
                    keywordMap.forEach((keywords, doi) => {
                        keywords.forEach((keyword) => {
                            if(keywordCountMap.has(keyword)) {
                                keywordCountMap.set(keyword, keywordCountMap.get(keyword) + 1);
                            } else {
                                keywordCountMap.set(keyword, 1);
                            }
                            keywordSet.add(keyword);
                        })
                    })

                    let keywordArray = Array.from(keywordSet).sort((a, b) => {
                        return keywordCountMap.get(b) - keywordCountMap.get(a);
                    })
                    let keywordString = keywordArray.map((keyword) => {
                        return `* ${keyword} (${keywordCountMap.get(keyword)})`;
                    }).join("\n");
                    result = result.concat(`\n\n### Keywords\n\n${keywordString}`);

                    return result;

                });
            });
        });
    }

    public content(): Promise<string> {
        return this.generateData().then((content) => {
            return md.render(content);
        })
    }
}