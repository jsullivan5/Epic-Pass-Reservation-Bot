#!/usr/bin/env bash

RED=$'\e[0;31m'
GREEN=$'\e[0;32m'
CYAN=$'\e[0;36m'
NO_COLOR=$'\e[0m'

echo "Hello ${RED}$USER!${GREEN}"
sleep 2
echo '___________      .__         __________        __   
\_   _____/_____ |__| ____   \______   \ _____/  |_ 
 |    __)_\____ \|  |/ ___\   |    |  _//  _ \   __\
 |        \  |_> >  \  \___   |    |   (  <_> )  |  
/_______  /   __/|__|\___  >  |______  /\____/|__|  
        \/|__|           \/          \/             '
sleep 1
echo "${CYAN}"
echo '                __   
   ____   _____/  |_ 
  / ___\_/ __ \   __\
 / /_/  >  ___/|  |  
 \___  / \___  >__|  
/_____/      \/      
                     '
sleep 1
echo '                           .___      
_______   ____ _____     __| _/__.__.
\_  __ \_/ __ \\__  \   / __ <   |  |
 |  | \/\  ___/ / __ \_/ /_/ |\___  |
 |__|    \___  >____  /\____ |/ ____|
             \/     \/      \/\/     '
sleep 1
echo '  __          
_/  |_  ____  
\   __\/  _ \ 
 |  | (  <_> )
 |__|  \____/ 
              '
sleep 1
echo "${RED}"
echo '_________ ___ ________________________________   
 /   _____//   |   \______   \_   _____/\______ \  
 \_____  \/    ~    \       _/|    __)_  |    |  \ 
 /        \    Y    /    |   \|        \ |    `   \
/_______  /\___|_  /|____|_  /_______  //_______  /
        \/       \/        \/        \/         \/'
sleep 1
echo "${CYAN}"
echo '              *
              XX
             MMMMM
             //(00
          .:.....
        .:::::::::
       :: %%%%%% ::.
      ::  ::::::  :::::::I)
      (%  ::::::         |
      /   |   /_____     |
     /    |         ))   |
    /      ------/ //    |
   /            / //     |
  /            / //      |
 *            ZZZZ       *
    _________ZZZZZZ_________//_//
------------------------------------'
echo "${NO_COLOR}"

OIFS="$IFS"; IFS=$'\n'; resort_array=($(<resort.list)); IFS="$OIFS"
month_array=(January February March April May June)

read -p "Enter Epic email: "            username
echo "Enter Epic password: " && read -s password

PS3="Choose a resort: "
select resort in "${resort_array[@]}";
do
  echo "$resort ($REPLY). ${RED}Sick Bruh${NO_COLOR}"
  chosen_resort=$resort
	break;
done

PS3="What Month do you want to go: "
select month in "${month_array[@]}";
do
  echo "$month ($REPLY). ${RED}Rad.${NO_COLOR}"
  chosen_month="$(($REPLY - 1))"
	break;
done
read -p "What day: " chosen_day

export USERNAME=$username
export PASSWORD=$password
export RESORT=$chosen_resort
export MONTH=$chosen_month
export DAY=$chosen_day

node src/index.js
