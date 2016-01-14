# README: run once to install all needed dependecies

echo ""
echo "Hello in automatic dependecies installer"

if [ "$EUID" -ne 0 ]
  then echo "Please run as root"
       exit
fi

read -p "If you got installed ruby and node.js? \n press any key (Ctrl+C to abort)"

cd ../

echo "Updating gem"
gem update --system

echo "Installing compass"
gem install compass

echo "Installing gulp globally"
npm install gulp -g
echo "Installing dependecies"
npm install

echo ""
echo "install success"
echo "running server"
