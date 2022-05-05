export interface Stats {
    children: { name: string; assetsByChunkName: { main: string[] }; outputPath: string }[]
}
