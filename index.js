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
                    $regex: new RegExp(mainSearchEscape(term), 'im')
                }
            })
        })
        return terms
    }

    }