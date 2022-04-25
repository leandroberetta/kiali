VERSION=$(sed -rn 's/^VERSION \?= v(.*)/\1/p' Makefile | xargs)

if [[ $RELEASE_TYPE == "patch" ]]
then
    VERSION_TO_RELEASE=v$(./.github/workflows/util/semver bump $RELEASE_TYPE $VERSION)
elif [[ $RELEASE_TYPE == "minor" ]] || [[ $RELEASE_TYPE == "major" ]]
then 
    VERSION_TO_RELEASE=v$(./.github/workflows/util/semver bump release $VERSION)
elif [[ $RELEASE_TYPE == *"snapshot"* ]]
then
    VERSION_TO_RELEASE=v$(./.github/workflows/util/semver bump prerel $RELEASE_TYPE $VERSION)
elif [[ $RELEASE_TYPE == "edge" ]]
then
    VERSION_TO_RELEASE=latest
fi

echo $VERSION_TO_RELEASE