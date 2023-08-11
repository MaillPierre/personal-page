import $ from 'jquery';

import { ContentPerson, ContentSocial, ContentPublications } from './Modules';
import * as config from '../../config/default.json';

$(() => {
    

    let modules = [
        new ContentPerson(config),
        new ContentSocial(config),
        new ContentPublications(config)
    ];

    modules.forEach(module => {
        module.render();
    })
});


