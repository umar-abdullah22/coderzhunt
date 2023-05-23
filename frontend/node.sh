cd admin
npm start
# npm install  --legacy-peer-deps
cd clients
# npm install  --legacy-peer-deps
npm start
cd moderators
# npm install --legacy-peer-deps
npm start
# yes | cp -r build/* /var/www/html/moderators
#bash -x node.sh