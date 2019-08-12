# Keycloak設定手順（Windows）

自分なりのKeycloakの設定

## 環境と利用ツール
 - Windows 10 Pro
 - docker toolbox for windows

## 事前準備、共通設定
1. dockerを起動する
1. `http://192.168.99.100:32768/auth` でKeycloak admin consoleのログイン画面に入る
1. スーパーユーザーでログイン
1. 左上の`master`のところにマウスを置き、`Add realm`を選択する
1. `name`を入力し、`create`をクリック、レルムを作成、詳しい設定画面に遷移
1. `Realm Settings`
    - `Login`: `User registration`を`On`に切り換え、セーブ
    - `Tokens`: `Default Signature Algorithm`で`RS256`を選択、セーブ
1. `Groups`
    - `Groups`: `New`をクリック、`Super-Users`と`Normal-Users`を作る
    - `Default Groups`: 右列`Normal-Users`を選択、`Add`をクリック

## フロント側のクライアント設定
1. `Clients`を選択、`create`をクリック、クライアントを作成
    - `Client ID`任意指定
    - `Client Protocol`を`Openid-connect`に選択
    - `Root URL`フロント側のアプリのベースURLに指す（`http://192.168.99.100/8080/`）
1. `Settings`: `Web Origins`を`+`にする
1. `Roles`: `Add Role`をクリック、`Super User`と`Normal User`を作る
1. **realm**の`Groups`
    - `Normal-Users`を選択、`Edit`をクリック
    - `Role Mappings` -> `Client Roles`
      - ***Client ID*** 選択
      - `Available Roles`で`Normal-User`を選択、`Add selected`を押す
    - `Super-Users`同じく

***realm ID*** 、***client ID*** はフロント側で利用

## バックエンドのクライアント設定（Django）
1. 同[フロント側1.](#フロント側のクライアント設定)
1. 同[フロント側2.](#フロント側のクライアント設定)
1. `Settings`
    - `Access Type`を`Confidential`に
    - `Authorization Enabled`を`On`に
    - `Valid Redirect URLs`に**フロントクライアント**の ***Root URL*** を入れる
    - `Web Origins`を`+`に
1. `Credentials`: `Secret`キーを保存
1. `Roles`: `Super User`と`Normal User`を作る
1. `Authorization`
    - `Authorization Scopes`:
      - `create`をクリック
      - `Name`と`Display name`を指定し、スコープを作成
        - DEMO: Inventory:add, Inventory:update, Inventory:delete, Inventory:view
    - `Policies`
      - 右側ドロップダウン`Create Policy...`で`Role`を選択
      - `Name`に`normal-user-policy`を入力、
      - `Realm Roles`で`Normal User`を選択し、`Required`を付け
      - 必要に応じ、`Clients Roles`を選択
      - 上記繰り返し、`super-user-policy`を作成
    - `Permissions`
      - 右側ドロップダウン`Create Permission...`で`Scope Based`を選択
      - `Name`に`Read-Only`を入力、
      - `Scopes`で`Authorization Scopes`で作成した ***Scopes*** を選択
        - DEMO: Inventory:view
      - `Apply Policy`で`normal-user-policy`を選択、セーブ
      - 上記繰り返し、`super-user-policy`に`full-access`を振る
    - `Export Settings`
      - `Export`で`Download`、***client-id***-authz-config.jsonを保存
1. 同[フロント側4.](#フロント側のクライアント設定)