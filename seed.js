import { EntryModel, CategoryModel, dbClose } from './db.js'

const categories = [
  { name: 'Food' },
  { name: 'Gaming' },
  { name: 'Coding' },
  { name: 'Other' }
]

await CategoryModel.deleteMany()
console.log('Deleted Categories')
const cats = await CategoryModel.insertMany(categories)
console.log('Inserted Categories')

const entries = [
  { category: cats[0], content: 'Pizza is yummy!' },
  { category: cats[2], content: 'Coding is fun!' },
  { category: cats[1], content: 'Skyrim is for the Nords!' }
]

await EntryModel.deleteMany()
console.log('Deleted Entries')
await EntryModel.insertMany(entries)
console.log('Inserted Entries')
dbClose()