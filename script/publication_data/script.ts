import * as $rdf from 'rdflib';
import * as Query from '../../src/js/QueryUtils';
import * as RDFUtil from '../../src/js/RDFUtils';

let dblpData = RDFUtil.createStore();

Query.fetchGETPromise(`https://dblp.org/pid/${this.idDBLP}.ttl`).then((dataString) => {
    RDFUtil.parseTurtleToStore(dataString, dblpData, `https://dblp.org/pid/${this.idDBLP}.ttl`).then(() => {
        let articlesNodes = dblpData.statementsMatching(undefined, RDFUtil.DBLP("authorOf"), undefined).map(statement => statement.object);
        return Promise.allSettled(articlesNodes.filter(articleNode => $rdf.isNamedNode(articleNode)).map((articleNode) => {
            return Query.fetchGETPromise(`${articleNode.value}.ttl`).then(articleDataString => {
                return RDFUtil.parseTurtleToStore(articleDataString, dblpData, `${articleNode.value}.ttl`)
            })
        }))
    });
})