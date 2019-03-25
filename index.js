const fs = require('fs-extra')
const directory = './tmp/'
const file = 'tmp/pubs.json'
const data =  {"name": "Arawak",
                "owner": {
                    "firstName": "Nicolas",
                    "lastName": "Hodicq",
                    "mail": "nhodicq@bewizyu.com"
                }
}

async function dirExists (dir) {
    try{
        const exists = await fs.pathExists(dir)
        console.log(exists)
         if(exists){
            await fs.remove(dir)
            console.log('remove success!')
         }
         await fs.ensureDir(dir)
         console.log('create directory success !')

        await fs.writeJson(file, data)
        console.log('create file success!')

        await fs.watchFile(file, (curr, prev) => {
                console.log(`the current mtime is: ${curr.mtime}`);
                console.log(`the previous mtime was: ${prev.mtime}`);
              })

    }catch (err) {
         console.error(err)
    }

}

dirExists(directory)