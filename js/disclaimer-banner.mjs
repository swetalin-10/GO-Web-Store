export class DisclaimerBanner extends HTMLElement {
  static STORAGE_KEY = "disclaimerDismissed";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (localStorage.getItem(DisclaimerBanner.STORAGE_KEY) === "true") {
      this.remove();
      return;
    }
    this.render();
    this.shadowRoot
      .querySelector("md-icon-button")
      .addEventListener("click", () => this.dismiss());
  }

  dismiss() {
    localStorage.setItem(DisclaimerBanner.STORAGE_KEY, "true");
    this.classList.add("dismissed");
    this.addEventListener("transitionend", () => this.remove());
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: fixed;
          inset-block-start: 0;
          inset-inline: 0;
          interpolate-size: allow-keywords;
          block-size: auto;
          overflow: hidden;
          transition: block-size 0.3s ease, opacity 0.3s ease;
        }

        :host(.dismissed) {
          block-size: 0;
          opacity: 0;
        }

        article {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-block: 10px;
          padding-inline: 20px;
          background-color: var(--md-sys-color-on-secondary);
          border-block-end: 1px solid var(--md-sys-color-secondary-container);
        }

        p {
          flex: 1;
          padding-inline-start: 50px;
          margin: 0;
          font-size: 0.875rem;
          color: var(--md-sys-color-on-surface);
          text-align: center;
          line-height: 1.4;
        }

        md-icon-button {
          flex-shrink: 0;
        }

        a {
          color: var(--md-sys-color-primary);
          text-decoration: none;
        }

        a:hover {
          text-decoration: underline;
        }
      </style>

      <article>
        <p>
          Built by GSoC student contributors and may contain bugs or incomplete features. 
          Use at your own risk. 
        </p>
        <md-icon-button aria-label="Close">
          <md-icon>close</md-icon>
        </md-icon-button>
      </article>
    `;
  }
}
