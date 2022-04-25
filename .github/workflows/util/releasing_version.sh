OPERATOR_VERSION=$(sed -rn 's/^VERSION \?= v(.*)/\1/p' Makefile | xargs)

if [[ $RELEASE_TYPE == "patch" ]]
then
    OPERATOR_VERSION_TO_RELEASE=v$(./.github/workflows/util/semver bump $RELEASE_TYPE $OPERATOR_VERSION)
elif [[ $RELEASE_TYPE == "minor" ]] || [[ $RELEASE_TYPE == "major" ]]
then 
    OPERATOR_VERSION_TO_RELEASE=v$(./.github/workflows/util/semver bump release $OPERATOR_VERSION)
elif [[ $RELEASE_TYPE == *"snapshot"* ]]
then
    OPERATOR_VERSION_TO_RELEASE=v$(./.github/workflows/util/semver bump prerel $RELEASE_TYPE $OPERATOR_VERSION)
elif [[ $RELEASE_TYPE == "edge" ]]
then
    OPERATOR_VERSION_TO_RELEASE=latest
fi

echo $OPERATOR_VERSION_TO_RELEASE