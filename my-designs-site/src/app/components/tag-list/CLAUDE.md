# CLAUDE.md — TagListComponent

## Purpose
Reusable tag-pill list with an optional section label. Renders a flex-wrapped row of `.tag`
pills, optionally preceded by a `.type-eyebrow` title. Used wherever a labelled or unlabelled
group of tags appears — About skills, Experience metadata, Project tech stacks.

## Location
`src/app/components/tag-list/`

## Selector
`app-tag-list`

## Inputs
| Name    | Type                   | Required | Description                                           |
|---------|------------------------|----------|-------------------------------------------------------|
| `title` | `string`               | No       | Eyebrow label above the tags. Omit to skip the label. |
| `tags`  | `readonly string[]`    | Yes      | Tag strings to render as `.tag` pills.                |

## Special values
The string `'ClearTonic Games_'` is rendered with the brand underscore as an accent span:
`ClearTonic Games<span class="brand-underscore">_</span>`.

## Does Not
- Own any data — all content is passed in via inputs
- Apply its own reveal animation — parent is responsible for `appReveal`
- Add extra margins — spacing between groups is the parent's concern
