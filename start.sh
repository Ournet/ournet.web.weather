
### start weather web app

#forever stopall

(export COUNTRY=md PORT=4101 && forever start index.js -c "node --max_old_space_size=100")

(export COUNTRY=ro PORT=4102 && forever start index.js -c "node --max_old_space_size=100")

(export COUNTRY=ru PORT=4103 && forever start index.js -c "node --max_old_space_size=100")

(export COUNTRY=bg PORT=4104 && forever start index.js -c "node --max_old_space_size=100")

(export COUNTRY="in" PORT=4105 && forever start index.js -c "node --max_old_space_size=100")

(export COUNTRY=it PORT=4106 && forever start index.js -c "node --max_old_space_size=100")