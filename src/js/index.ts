import $ from 'jquery';

import { ContentPerson, ContentSocial, ContentPublications, ContentHAL } from './Modules';
import * as config from '../../config/default.json';

$(() => {
    

    let modules = [
        new ContentPerson(config),
        new ContentSocial(config),
        // new ContentPublications(config),
        new ContentHAL(config)
    ];

    modules.forEach(module => {
        module.render();
    })
});


