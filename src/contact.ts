import { onPage } from './engine';
import { emailLinks } from './lib/email';

const storageKey = 'portfolio-contact-idea';
let currentDraft = '';

async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch { /* The visible selection fallback works when clipboard permission is unavailable. */ }
  return false;
}

export function setupContact() {
  onPage(() => {
    const input = document.querySelector<HTMLInputElement>('#ask-idea');
    let revision = 0;
    try { currentDraft = sessionStorage.getItem(storageKey) ?? currentDraft; } catch { /* Keep the in-memory draft. */ }
    if (input && !input.value) input.value = currentDraft;

    const sync = () => {
      revision++;
      if (input) currentDraft = input.value;
      try {
        if (currentDraft) sessionStorage.setItem(storageKey, currentDraft);
        else sessionStorage.removeItem(storageKey);
      } catch { /* Disabled storage must not block composing. */ }
      document.querySelectorAll<HTMLElement>('[data-email-options]').forEach((options) => {
        const manual = options.querySelector<HTMLTextAreaElement>('[data-copy-manual]');
        if (manual) { manual.value = ''; manual.hidden = true; }
        const status = options.querySelector<HTMLElement>('[data-email-status]');
        if (status) status.textContent = '';
        const links = emailLinks(options.dataset.email!, currentDraft);
        options.querySelectorAll<HTMLAnchorElement>('[data-email-provider]').forEach((link) => {
          link.href = links[link.dataset.emailProvider as keyof typeof links];
        });
      });
      document.querySelectorAll<HTMLAnchorElement>('[data-email-primary]').forEach((link) => {
        link.href = emailLinks(link.dataset.emailPrimary!, currentDraft).gmail;
      });
      document.querySelectorAll<HTMLAnchorElement>('[data-email-direct]').forEach((link) => {
        link.href = emailLinks(link.textContent!.trim(), currentDraft).app;
      });
      document.querySelectorAll<HTMLElement>('[data-copy-draft], [data-clear-draft]').forEach((button) => {
        button.hidden = !currentDraft;
      });
    };
    const form = document.querySelector<HTMLFormElement>('[data-contact-form]');
    input?.addEventListener('input', sync);
    form?.addEventListener('submit', sync);

    const click = async (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest<HTMLElement>('[data-copy], [data-copy-draft], [data-clear-draft], [data-email-provider="app"]');
      if (!target) return;
      if (target.hasAttribute('data-clear-draft')) {
        currentDraft = '';
        if (input) { input.value = ''; input.focus(); }
        sync();
        return;
      }
      const options = target.closest<HTMLElement>('[data-email-options]');
      const status = options?.querySelector<HTMLElement>('[data-email-status]');
      if (target.dataset.emailProvider === 'app') {
        if (status) status.textContent = 'If no email app opens, choose Gmail or Outlook.com instead.';
        return;
      }
      const text = target.hasAttribute('data-copy-draft') ? currentDraft : target.dataset.copy!;
      const copyRevision = revision;
      const copied = await copyText(text);
      if (!target.isConnected || copyRevision !== revision) return;
      const manual = options?.querySelector<HTMLTextAreaElement>('[data-copy-manual]');
      if (manual) manual.hidden = copied;
      if (copied) {
        if (status) status.textContent = target.hasAttribute('data-copy-draft') ? 'Idea copied.' : 'Email address copied.';
      } else if (manual) {
        manual.value = text;
        manual.focus();
        manual.select();
        manual.setSelectionRange(0, text.length);
        if (status) status.textContent = 'Copy the selected text below.';
      }
    };
    document.addEventListener('click', click);
    sync();
    return () => {
      input?.removeEventListener('input', sync);
      form?.removeEventListener('submit', sync);
      document.removeEventListener('click', click);
    };
  });
}
