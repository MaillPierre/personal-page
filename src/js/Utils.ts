import * as fs from "fs";
import * as $rdf from 'rdflib';
import ttl_read from "@graphy/content.ttl.read";
import nt_read from "@graphy/content.nt.read";
import nq_read from "@graphy/content.nq.read";
import trig_read from "@graphy/content.trig.read";
import fetch, { FetchError, RequestInit } from 'node-fetch';
import * as Logger from './LogUtils';

export const CC = $rdf.Namespace("http://creativecommons.org/ns#");
export const DBLP = $rdf.Namespace("https://dblp.org/rdf/schema#");
export const DCAT = $rdf.Namespace("http://www.w3.org/ns/dcat#");
export const DCE = $rdf.Namespace("http://purl.org/dc/elements/1.1/");
export const DCT = $rdf.Namespace("http://purl.org/dc/terms/");
export const EARL = $rdf.Namespace("http://www.w3.org/ns/earl#");
export const FOAF = $rdf.Namespace("http://xmlns.com/foaf/0.1/");
export const KGI = $rdf.Namespace("http://ns.inria.fr/kg/index#");
export const MANIFEST = $rdf.Namespace("http://www.w3.org/2001/sw/DataAccess/tests/test-manifest#");
export const MOD = $rdf.Namespace("https://w3id.org/mod#");
export const OWL = $rdf.Namespace("http://www.w3.org/2002/07/owl#");
export const PAV = $rdf.Namespace("http://purl.org/pav/");
export const PROV = $rdf.Namespace("http://www.w3.org/ns/prov#");
export const RDF = $rdf.Namespace("http://www.w3.org/1999/02/22-rdf-syntax-ns#");
export const RDFS = $rdf.Namespace("http://www.w3.org/2000/01/rdf-schema#");
export const SCHEMA = $rdf.Namespace("http://schema.org/");
export const SKOS = $rdf.Namespace("http://www.w3.org/2004/02/skos/core#");
export const VOID = $rdf.Namespace("http://rdfs.org/ns/void#");
export const XSD = $rdf.Namespace("http://www.w3.org/2001/XMLSchema#");
export const SD = $rdf.Namespace("http://www.w3.org/ns/sparql-service-description#");

export const rdfTypeProperty = RDF("type");

export function urlToBaseURI(url: string) {
    const baseURI = url.replace(new RegExp("/^(?:.*\/)*([^\/\r\n]+?|)(?=(?:\.[^\/\r\n.\.]*\.)?$)/gm"), "");
    return baseURI;
}

export function createStore() {
    let store = $rdf.graph();
    store.setPrefixForURI("cc", "http://creativecommons.org/ns#");
    store.setPrefixForURI("culturefr", "https://www.culture.gouv.fr/");
    store.setPrefixForURI("dbfr", "http://fr.dbpedia.org/");
    store.setPrefixForURI("dbfrg", "http://fr.dbpedia.org/graph/");
    store.setPrefixForURI("dbfrp", "http://fr.dbpedia.org/property/");
    store.setPrefixForURI("dblp", "https://dblp.org/rdf/schema#");
    store.setPrefixForURI("dbo", "http://dbpedia.org/ontology/");
    store.setPrefixForURI("dbspr", "http://dbpedia.org/schema/property_rules#");
    store.setPrefixForURI("dcat", "http://www.w3.org/ns/dcat#");
    store.setPrefixForURI("dce", "http://purl.org/dc/elements/1.1/");
    store.setPrefixForURI("dcmitype", "http://purl.org/dc/dcmitype/");
    store.setPrefixForURI("eclass", "http://www.ebusiness-unibw.org/ontologies/eclass/5.1.4/#");
    store.setPrefixForURI("ex", "https://e.g/#");
    store.setPrefixForURI("georss", "http://www.georss.org/georss/");
    store.setPrefixForURI("goodrel", "http://purl.org/goodrelations/v1#");
    store.setPrefixForURI("inria", "https://www.inria.fr/");
    store.setPrefixForURI("kgi", "http://ns.inria.fr/kg/index#");
    store.setPrefixForURI("localdav", "http://localhost:8890/DAV/");
    store.setPrefixForURI("mod", "https://w3id.org/mod#");
    store.setPrefixForURI("oa", "http://www.w3.org/ns/oa#");
    store.setPrefixForURI("openvoc", "http://open.vocab.org/terms/");
    store.setPrefixForURI("pav", "http://purl.org/pav/");
    store.setPrefixForURI("powders", "http://www.w3.org/2007/05/powder-s#");
    store.setPrefixForURI("schema", "http://schema.org/");
    store.setPrefixForURI("sd", "http://www.w3.org/ns/sparql-service-description#");
    store.setPrefixForURI("skos", "http://www.w3.org/2004/02/skos/core#");
    store.setPrefixForURI("vann", "http://purl.org/vocab/vann/");
    store.setPrefixForURI("voaf", "http://purl.org/vocommons/voaf#");
    store.setPrefixForURI("wdentity", "http://www.wikidata.org/entity/");
    store.setPrefixForURI("wimmics", "https://team.inria.fr/wimmics/");
    return store;
}

export const NTriplesContentType = "application/n-triples" as const
export const NQuadsContentType = "application/nquads" as const
export const TurtleContentType = "text/turtle" as const
export const TrigContentType = "application/trig" as const

export type FileContentType = typeof TurtleContentType | typeof NTriplesContentType | typeof NQuadsContentType | typeof TrigContentType;

export function guessContentType(filename: string): FileContentType | undefined {
    filename = filename.trim();
    if (filename.endsWith(".ttl")) {
        return TurtleContentType;
    } else if (filename.endsWith(".nt")) {
        return NTriplesContentType;
    } else if (filename.endsWith(".nq")) {
        return NQuadsContentType;
    } else if (filename.endsWith(".trig")) {
        return TrigContentType;
    } else {
        return undefined;
    }
}

function getGraphyReadingFunction(contentType: FileContentType) {
    switch (contentType) {
        case NQuadsContentType:
            return nq_read;
        case NTriplesContentType:
            return nt_read;
        case TrigContentType:
            return trig_read;
        default:
        case TurtleContentType:
            return ttl_read;
    }
}

function graphyQuadLoadingToStore(store: $rdf.Store, y_quad: any, baseURI = KGI("").value) {
    let s: $rdf.NamedNode | $rdf.BlankNode | $rdf.Literal;
    if (y_quad.subject.termType === "NamedNode") {
        s = $rdf.sym(y_quad.subject.value)
    } else if (y_quad.subject.termType === "Literal") {
        if (y_quad.subject.language != null && y_quad.subject.language != undefined && y_quad.subject.language != "") {
            s = $rdf.lit(y_quad.subject.value, y_quad.subject.language)
        } else if (y_quad.subject.datatype != null && y_quad.subject.datatype != undefined && y_quad.subject.datatype != "") {
            s = $rdf.lit(y_quad.subject.value, undefined, $rdf.sym(y_quad.subject.datatype))
        } else {
            s = $rdf.lit(y_quad.subject.value)
        }
    } else {
        s = $rdf.blankNode(baseURI + "#" + y_quad.subject.value)
    };
    const p: $rdf.NamedNode = $rdf.sym(y_quad.predicate.value);
    let o: $rdf.NamedNode | $rdf.BlankNode | $rdf.Literal;
    if (y_quad.object.termType === "NamedNode") {
        o = $rdf.sym(y_quad.object.value)
    } else if (y_quad.object.termType === "Literal") {
        if (y_quad.object.language != null && y_quad.object.language != undefined && y_quad.object.language != "") {
            o = $rdf.lit(y_quad.object.value, y_quad.object.language)
        } else if (y_quad.object.datatype != null && y_quad.object.datatype != undefined && y_quad.object.datatype != "") {
            o = $rdf.lit(y_quad.object.value, undefined, $rdf.sym(y_quad.object.datatype))
        } else {
            o = $rdf.lit(y_quad.object.value)
        }
    } else {
        o = $rdf.blankNode(baseURI + "#" + y_quad.object.value)
    };

    if (!$rdf.isLiteral(s)) { // The application of RDF reasoning makes appear Literals as subjects, for some reason. We filter them out.
        if (y_quad.graph.value === '') {
            Logger.log(s.toNT(), p.toNT(), o.toNT());
            store.add(s, p, o);
        } else {
            const g = $rdf.sym(y_quad.graph);
            Logger.log(s.toNT(), p.toNT(), o.toNT(), g.toNT());
            store.add(s, p, o, g);
        }
    }
}

export function loadRDFFile(file: string, store: $rdf.Store, baseURI?: string): Promise<any> {
    return loadRDFFiles([file], store, baseURI);
}

export function loadRDFFiles(files: Array<string>, store: $rdf.Store, generalBaseUri?: string): Promise<any> {
    try {
        const promiseArray = files.map(filename => {
            let baseURI = urlToBaseURI(filename);
            if (generalBaseUri != null && generalBaseUri != undefined) {
                baseURI = generalBaseUri;
            }
            const contentType = guessContentType(filename);
            let readingFunction = ttl_read;
            if (contentType != undefined) {
                readingFunction = getGraphyReadingFunction(contentType)
            } else {
                throw new Error("Unsupported content type for " + filename + ", only .ttl, .nq and .nt supported.");
            }

            return new Promise<void>((resolve, reject) => {
                try {
                    if (filename.startsWith("http")) {
                        filename = filename.replace("http://", "https://");
                    } else if (filename.startsWith("file")) {
                        filename = filename.replace("file://", "");
                    }
                    fs.createReadStream(filename)
                        .pipe(readingFunction({ baseURI: baseURI }))
                        .on('data', (y_quad) => {
                            graphyQuadLoadingToStore(store, y_quad, baseURI)
                        })
                        .on('eof', prefixes => {
                            resolve();
                        })
                        .on('error', (error) => {
                            Logger.error("Error while reading RDF file", filename, "during stream", "error", error);
                            reject(error)
                        });
                } catch (error) {
                    Logger.error("Error while loading RDF files", files, "error", error);
                    reject(error)
                }
            }).catch(error => {
                Logger.error("Error while loading RDF files", files, "error", error);
                return Promise.reject(error);
            })
        });
        return Promise.allSettled(promiseArray)
    } catch (error) {
        Logger.error("Error while loading RDF files", files, "error", error);
        return Promise.reject(error);
    }
}

export function fetchPromise(url, header = new Map(), method = "GET", query = "", numTry = 0) {
    let myHeaders = new Headers();
    myHeaders.set('pragma', 'no-cache');
    myHeaders.set('cache-control', 'no-cache');
    header.forEach((value, key) => {
        myHeaders.set(key, value);
    });
    let myInit: RequestInit = {
        method: method,
        headers: myHeaders,
        redirect: 'follow',
    };
    if (method.localeCompare("POST") == 0) {
        myInit.body = query;
    }
    return fetch(url, myInit)
        .then(response => {
            if (response.ok) {
                return response.blob().then(blob => blob.text())
            } else {
                throw response;
            }
        }).catch(error => {
            Logger.error(error.type, error.message);
        }).finally(() => {
            return;
        });

}
export function fetchGETPromise(url, header = new Map()) {
    return fetchPromise(url, header);
}

export function fetchPOSTPromise(url, query = "", header = new Map()) {
    return fetchPromise(url, header, "POST", query);
}