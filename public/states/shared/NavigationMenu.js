define(() => {
    class NavigationMenu {
        constructor (...options) {
            this.state = -1;
            options.forEach((option, i) => {
                option.stateIndex = i;
                option.button.frame = option.startFrame;
                option.button.onInputOver.add(() => {
                    if (option.stateIndex !== this.state)
                        this.setState(option.stateIndex);
                });
                option.button.onInputDown.add(() => {
                    if (option.animation !== null)
                        option.button.animations.stop();
                    if (option.downFrame !== null)
                        option.button.frame = option.downFrame;
                });
                option.button.visible = false;
            });
            this.options = options;
        }

        setState (stateIdx) {
            let op;
            if (this.state !== -1) {
                op = this.options[this.state];
                op.button.animations.stop();
                op.button.frame = op.startFrame;
            }

            this.state = stateIdx;

            if (this.state === -1) return;

            op = this.options[this.state];
            if (op.overFrame !== null)
                op.button.frame = op.overFrame;

            if (op.animation !== null)
                op.button.animations.play(op.animation);
        }

        nextState () {
            let s = this.state;
            if (s === this.options.length - 1)
                s = 0;
            else
                s++;
            this.setState(s);

            return s;
        }

        prevState () {
            let s = this.state;
            if (s === 0 || s === -1)
                s = this.options.length - 1;
            else
                s--;
            this.setState(s);

            return(s);
        }

        onClick () {
            this.options[this.state].onClick();
        }

        open () {
            this.options.forEach((option) => {
                option.button.visible = true;
            });
        }

        close () {
            this.options.forEach((option) => {
                option.button.visible = false;
            });
            this.setState(-1);
        }
    }

    return NavigationMenu;
});