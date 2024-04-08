import $ from 'jquery';

import * as Module from './Modules';
import * as config from '../../config/default.json';

$(() => {
    

    let modules = [
        new Module.ContentPerson(config),
        new Module.ContentSocial(config),
        new Module.ContentMarkdown(config, "https://raw.githubusercontent.com/MaillPierre/personal-page/main/data/Previous_position.md", "#positions"),
        new Module.ContentPublications(config),
        new Module.ContentMarkdown(config, "https://raw.githubusercontent.com/MaillPierre/personal-page/main/data/Skills.md", "#skills"),
        // new Module.ContentProjects(config),
    ];

    modules.forEach(module => {
        module.render();
    })
});


