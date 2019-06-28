const TARGET_SERVER = {
    DJANGO: "http://192.168.99.100:8082"
}

const urlBuilder = (targetServer, targetService) => targetServer + targetService;

export const urls = {
    inventoryInfoApi: urlBuilder(TARGET_SERVER.DJANGO, "/demo/")
}