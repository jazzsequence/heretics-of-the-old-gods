import { i18n } from "../../i18n"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

const NotFound: QuartzComponent = ({ cfg, ctx }: QuartzComponentProps) => {
  const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
  const baseDir = ctx.argv.serve ? "/" : url.pathname

  return (
    <article class="popover-hint">
      <h1 id="nf-title">404</h1>
      <p id="nf-message">{i18n(cfg.locale).pages.error.notFound}</p>
      <a href={baseDir}>{i18n(cfg.locale).pages.error.home}</a>
      <script
        dangerouslySetInnerHTML={{
          __html: `
          (function() {
            var basePath = document.body.dataset.basepath || "";
            if (basePath.length > 1 && basePath.endsWith("/")) {
              basePath = basePath.slice(0, -1);
            }
            var pathname = window.location.pathname;
            var hasBasePrefix = basePath.length > 1 && pathname.startsWith(basePath);
            if (hasBasePrefix) {
              pathname = pathname.slice(basePath.length);
            }
            if (pathname.startsWith("/")) {
              pathname = pathname.slice(1);
            }
            if (pathname.endsWith("/")) {
              pathname = pathname.slice(0, -1);
            }
            if (pathname.endsWith(".html")) {
              pathname = pathname.slice(0, -5);
            }
            if (pathname.endsWith("/index")) {
              pathname = pathname.slice(0, -6);
            }

            if (typeof fetchData !== "undefined") {
              fetchData.then(function(index) {
                var lowered = pathname.toLowerCase();
                if (lowered !== pathname && index[lowered] != null) {
                  var prefix = hasBasePrefix ? basePath : "";
                  var target = prefix + (prefix.endsWith("/") ? "" : "/") + lowered;
                  window.location.replace(target);
                }
              });
            }

            var manifestUrl = (hasBasePrefix ? basePath : "") + "/secret-manifest.json";
            fetch(manifestUrl).then(function(res) {
              return res.ok ? res.json() : [];
            }).then(function(secretSlugs) {
              if (secretSlugs.indexOf(pathname.toLowerCase()) !== -1) {
                document.getElementById("nf-title").textContent = "Sealed";
                document.getElementById("nf-message").textContent =
                  "Some knowledge the Old Gods keep even from you. This page is not meant to be seen.";
              }
            }).catch(function() {});
          })();
          `,
        }}
      />
    </article>
  )
}

export default (() => NotFound) satisfies QuartzComponentConstructor
