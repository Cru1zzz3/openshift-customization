
# Openshift Web Console customization project
This project provides new widget for Openshift Web Console to monitoring and show status of different features.

## How to use it? 

#### 1. Edit webconsole ConfigMap

To add scripts and stylesheets, edit the webconsole-config ConfigMap in the openshift-web-console namespace. The web console configuration is available in the webconsole-config.yaml key of the ConfigMap.
```
$ oc edit configmap/webconsole-config -n openshift-web-console
```
#### 2. Add scripts and stylesheets to your webconsole config 

To add scripts, update the extensions.scriptURLs property. The value is an array of URLs.
To add stylesheets, update the extensions.stylesheetURLs property. The value is an array of URLs.

```yaml
apiVersion: v1
kind: ConfigMap
data:
  webconsole-config.yaml: |
    apiVersion: webconsole.config.openshift.io/v1
    extensions:
      scriptURLs:
        - https://cru1zzz3.github.io/openshift-customization/js/widget.js
      stylesheetURLs:
        - https://cru1zzz3.github.io/openshift-customization/css/logo.css
    [...]
```

 Scripts and stylesheets **must be served with the correct content type or they will not be run** by the browser. Scripts must be served with `Content-Type: application/javascript` and stylesheets with `Content-Type: text/css`.
You can use [Github Pages](https://pages.github.com/) for hosting your  `css` and  `js` files from your Github repository.

#### 3. Restart openshift-web-console pod

Save your modification and now — assuming you’re logged into the cluster and on the `openshift-web-console` project. Just delete the Web Console Pod to force refreshing the CSS and JS extensions. This can be done using :
```
$ oc delete pod -n openshift-web-console --all
```
A new Pod will take a few second to be restarted by OpenShift.

#### Detailed instructions by Customizing the Web Console you can see at [Official RedHat Openshift documentation](https://docs.openshift.com/container-platform/3.11/install_config/web_console_customization.html#loading-custom-scripts-and-stylesheets)
 
# Screenshots 

![General view of openshift web conole](https://cru1zzz3.github.io/openshift-customization/img/screenshot1.png "General view of openshift web conole" )

![Opened feature box](https://cru1zzz3.github.io/openshift-customization/img/screenshot2.png "Opened feature box" )


