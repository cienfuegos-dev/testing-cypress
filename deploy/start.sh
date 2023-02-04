# Used to start the docker image:
# - Generates the public-env.js using the system env vars
# - Sets read-only permissions to public-env.js
# - Starts the server

: \
  && (chmod -f 600 /usr/share/nginx/html/public-env/public-env.js || :) \
  && /app/deploy/public-env.js.sh > /usr/share/nginx/html/public-env/public-env.js \
  && echo File public-env.js generated. \
  && chmod 444 /usr/share/nginx/html/public-env/public-env.js \
  && nginx -g "daemon off;"
