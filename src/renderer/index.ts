import { remote } from 'electron'
import * as Xlsx from 'node-xlsx'
import * as path from 'path'
export const lists = Xlsx.parse(path.join(__dirname, "../public/data/example/guangdong_professional_score_table.xlsx"));