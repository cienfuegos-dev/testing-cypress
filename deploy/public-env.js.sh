# Environment JS template
cat  << EOF
// Automatically generated
window.publicEnv = {
    REACT_APP_APP_VERSION: "${REACT_APP_APP_VERSION?}",
    REACT_APP_DOCKER_IMAGE: "${REACT_APP_DOCKER_IMAGE?}",
    REACT_APP_DEMO_KEY: "${REACT_APP_DEMO_KEY?}",
};
EOF
