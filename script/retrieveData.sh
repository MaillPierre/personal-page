#! /bin/bash

corese_version=4.5.0
corese_jar=corese-command-$corese_version.jar
jq_version=1.7.1
jq_executable=jq-linux64

if [ ! -e $corese_jar ]; then
    wget -q https://github.com/Wimmics/corese/releases/download/release-$corese_version/$corese_jar
fi

if [ ! -e $jq_executable ]; then
    wget -q https://github.com/jqlang/jq/releases/download/jq-$jq_version/$jq_executable
    chmod +x $jq_executable
fi

# Retrieve the DBLP files
# https://dblp.org/pid/${this.idDBLP}.ttl
dblp_person=../data/dblp_person.ttl
article_query_file=article_query.rq
tmp_dblp_person_file=../data/dblp_person.jsonld
./$jq_executable '.["social"]["dblp"]' ../config/default.json | xargs -I {} curl -s -o $dblp_person https://dblp.org/pid/{}.ttl 
dblp_articles_file=../data/dblp_articles.ttl
java -jar $corese_jar sparql -w -i $dblp_person -o $dblp_articles_file -of turtle -q $article_query_file

# Retrieve the content of the github repository
github_event_file=../data/github_event.json
./$jq_executable '.["projects"]["github"]' ../config/default.json | xargs -I {} curl -s -o $github_event_file https://api.github.com/users/{}/events/public 