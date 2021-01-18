#!/bin/bash


echo "Installing tools"

curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv D1EA2D4C
echo "deb http://apt.pm2.io/ubuntu stable main" | sudo tee /etc/apt/sources.list.d/pm2.list

sudo apt update && sudo apt -y install yarn git nodejs pm2


echo "Cloning repo and building project"
mkdir appVsVold
cd appVsVold
git clone https://github.com/xcitic/appVsVold.git .

cd frontend
yarn install 
yarn run build

cd ../backend
yarn install 

cd ../
rm -rf backend/dist 
mv frontend/dist backend/dist

echo "Starting application"
cd backend
pm2 start main.js