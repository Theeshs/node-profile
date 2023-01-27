import { RepositoryInput } from "../types/repositoryInput";
import { Arg, Query, Resolver } from "type-graphql";
import { RepositoryResponse } from "../types/repositoryResponse";

// const fetch = (url: RequestInfo, init?: RequestInit) => import("node-fetch").then(({ default: fetch }) => fetch(url, init));

@Resolver()
export class GitHubRepositoris {
    @Query(_returns => RepositoryResponse, { nullable: false })
    async gitRepositories(@Arg("limit") limit: number, @Arg("method") method: string) {
        console.log(limit)
        const headers = new Headers()
        const payload = JSON.stringify({
            query: `{
                viewer {
                    login
                    name
                    repositories(${method}: ${limit}) {
                      nodes {
                        id
                        name
                        description
                        url
                        updatedAt
                        forkCount
                        openGraphImageUrl
                        stargazers {
                          totalCount
                        }
                        readme: object(expression: "master:README.md") {
                          ... on Blob {
                            text
                          }
                        }
                        licenseInfo {
                          id
                        }
                        primaryLanguage {
                          name
                        }
                        languages(first: 10) {
                          nodes {
                            name
                          }
                        }
                      }
                    }
                }
            }`,
        });

        headers.append("Content-Type", "application/graphql")
        headers.append("Authorization", "Bearer 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")
        // console.log(typeof payload)
        const requestOption = {
            method: "POST",
            headers,
            body: payload
        }
        const repos: RepositoryResponse = {
            name: "",
            login: "",
            reposiories: [{
                id: "",
                description: "",
                url: "",
                name: "",
                primaryLanguage: {
                    name: ""
                },
                updatedAt: Date.now().toString()
            }]
        }
        try {
            const response = await fetch("https://api.github.com/graphql", requestOption)
            const json = await response.json()
            repos.name = json.data.viewer.name
            repos.login = json.data.viewer.login
            repos.reposiories = json.data.viewer.repositories.nodes
            console.log(json.data.viewer.repositories.nodes)
        } catch (e) {
            console.log(e)
        }

        console.log(repos)

        return repos
    }
}