/**
 * @module botbuilder-dialogs
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { TurnContext } from 'botbuilder';
import { Dialog, DialogTurnResult, DialogContainer } from './dialog';
import { DialogContext } from './dialogContext';
/**
 * The `DialogContainer` class lets you break your bots logic up into components that can be added
 * as a dialog to other dialog sets within your bots project or exported and used in other bot
 * projects.
 *
 * @remarks
 * `DialogContainers` allow for the creation of libraries of reusable dialog components.
 *
 * #### Component Creation
 *
 * To create a reusable dialog component you'll want to define a new class derived from
 * `DialogContainer`. Your component has its own `DialogSet` which you can add dialogs to from
 * within your classes constructor.  You can add as many dialogs as you like and the dialogs can
 * be waterfalls, prompts, or even other component dialogs.
 *
 * Since developers will add instances of your component to their bots as other named dialogs, the
 * DialogContainer needs to know the ID of the initial dialog it should start anytime it's started.
 *
 * Here's a fairly simple example of a `ProfileDialog` that's designed to prompt the user to
 * enter their name and phone number which it will return as a JSON object to the caller:
 *
 * ```JavaScript
 * const { DialogContainer, TextPrompt } = require('botbuilder-dialogs');
 *
 * class ProfileDialog extends DialogContainer {
 *     constructor() {
 *         super('fillProfile');
 *
 *         this.dialogs.add('fillProfile', [
 *             async function (dc, options) {
 *                 dc.instance.state = {};
 *                 await dc.prompt('textPrompt', `What's your name?`);
 *             },
 *             async function (dc, name) {
 *                 dc.instance.state.name = name;
 *                 await dc.prompt('textPrompt', `What's your phone number?`);
 *             },
 *             async function (dc, phone) {
 *                 dc.instance.state.phone = phone;
 *
 *                 // Return completed profile
 *                 await dc.end(dc.instance.state);
 *            }
 *        ]);
 *
 *        this.dialogs.add('textPrompt', new TextPrompt());
 *     }
 * }
 * module.exports.ProfileDialog = ProfileDialog;
 * ```
 *
 * We've added two dialogs to our component, a waterfall and a prompt. And we've told the
 * DialogContainer that it should start the 'fillProfile' dialog anytime an instance of the
 * `ProfileDialog` is started. The DialogContainer will manager persisting the controls dialog
 * stack to the callers dialog stack.
 *
 * #### Component Usage
 *
 * On the consumption side the dialog we created can be used by a bot in much the same way they
 * would use any other prompt. They can add a new instance of the component as a named dialog to
 * their bots `DialogSet` and then start it using a call to `DialogContext.begin()`. If the
 * dialog accepts options these can be passed in to the `begin()` call and the `DialogContainer`
 * will pass them through as args to the initial dialog it starts.
 *
 * ```JavaScript
 * const { DialogSet } = require('botbuilder-dialogs');
 * const { ProfileDialog } = require('./profileControl');
 *
 * const dialogs = new DialogSet();
 *
 * dialogs.add('getProfile', new ProfileDialog());
 *
 * dialogs.add('firstrun', [
 *      async function (dc) {
 *          await dc.context.sendActivity(`Welcome! We need to ask a few questions to get started.`);
 *          await dc.begin('getProfile');
 *      },
 *      async function (dc, profile) {
 *          await dc.context.sendActivity(`Thanks ${profile.name}!`);
 *          await dc.end();
 *      }
 * ]);
 * ```
 * @param R (Optional) type of result that's expected to be returned by the dialog.
 * @param O (Optional) options that can be passed into the begin() method.
 */
export declare class DialogControl<R = any, O = {}> extends Dialog implements DialogContainer {
    private dialogs;
    protected initialDialogId: string;
    add<T extends Dialog>(dialog: T): T;
    createContext(context: TurnContext, state: object): Promise<DialogContext>;
    find<T extends Dialog = Dialog>(dialogId: string): T | undefined;
    dialogBegin(dc: DialogContext, dialogArgs?: any): Promise<DialogTurnResult<R>>;
    dialogCancel(dc: DialogContext): Promise<DialogTurnResult<R>>;
    dialogContinue(dc: DialogContext): Promise<DialogTurnResult<R>>;
    dialogReprompt(dc: DialogContext): Promise<DialogTurnResult>;
    dialogResume(dc: DialogContext, result?: any): Promise<DialogTurnResult>;
    protected onDialogBegin(dc: DialogContext, dialogArgs?: any): Promise<DialogTurnResult>;
    protected onDialogCancel(dc: DialogContext): Promise<DialogTurnResult>;
    protected onDialogContinue(dc: DialogContext): Promise<DialogTurnResult>;
    protected onDialogReprompt(dc: DialogContext): Promise<DialogTurnResult>;
}
