const mainSearchEscape = term => term
.replace(/\(/g, '\\(')
.replace(/\)/g, '\\)')
.replace(/[+?]/g, '');

module.exports = class {

    andStatements = ({ base, fieldToSearch, searchTerm }) => {
        // base could be [{ 'status.status': { $ne: 99 } }, { supplier: { $ne: '' } }]
        // fieldToSearch = String
        // searchterm = String, searchterms divided by ' '
        const terms = {
            $and: base || []
        }
        searchTerm.split(' ').forEach(term => {
            terms.$and.push({
                [fieldToSearch]: {
                    $regex: new RegExp(mainSearchEscape(term.toLowerCase()), 'im')
                }
            })
        })
        return terms
    }

    andStatementsArray = ({ base, fieldToSearch, searchTerm }) => {
        const terms = {
            $and: base || []
        }
        searchTerm.split(' ').forEach(term => {
            terms.$and.push({
                [fieldToSearch]: {
                    $all: [new RegExp(mainSearchEscape(term.toLowerCase()), 'im')]
                }
            })
        })
        return terms
    }

    idStatement = ({ base, fieldToSearch, searchTerm }) => {
        const terms = {
            $and: base || []
        }
        terms.$and.push({
            [fieldToSearch]: {
                $regex: new RegExp(`^${mainSearchEscape(searchTerm)}`, 'i')
            }
        })
        return terms
    }

    }