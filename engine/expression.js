// Expression System
// Allows data to contain计算表达式 like "attack * 1.5", "maxHp * 0.2"

var ExpressionSystem = {
    // Cache for parsed expressions
    cache: {},

    // Evaluate an expression string
    eval: function(expr, context) {
        if (typeof expr === 'number') return expr;
        if (typeof expr !== 'string') return 0;

        // Check cache
        if (this.cache[expr]) {
            return this._execute(this.cache[expr], context);
        }

        // Parse and cache
        var tokens = this._parse(expr);
        this.cache[expr] = tokens;
        return this._execute(tokens, context);
    },

    // Parse expression into tokens
    _parse: function(expr) {
        var tokens = [];
        var current = '';
        var operators = ['+', '-', '*', '/', '%', '(', ')'];

        for (var i = 0; i < expr.length; i++) {
            var ch = expr[i];
            if (ch === ' ') {
                if (current) tokens.push(current);
                current = '';
            } else if (operators.includes(ch)) {
                if (current) tokens.push(current);
                tokens.push(ch);
                current = '';
            } else {
                current += ch;
            }
        }
        if (current) tokens.push(current);

        return tokens;
    },

    // Execute parsed tokens
    _execute: function(tokens, context) {
        var values = [];
        var ops = [];
        var self = this;

        tokens.forEach(function(token) {
            if (['+', '-', '*', '/', '%'].includes(token)) {
                ops.push(token);
            } else if (token === '(') {
                ops.push('(');
            } else if (token === ')') {
                while (ops.length > 0 && ops[ops.length - 1] !== '(') {
                    self._applyOp(values, ops.pop());
                }
                ops.pop(); // Remove '('
            } else {
                values.push(self._resolveValue(token, context));
            }
        });

        while (ops.length > 0) {
            this._applyOp(values, ops.pop());
        }

        return values[0] || 0;
    },

    // Resolve a variable name to its value
    _resolveValue: function(name, context) {
        // Number literal
        var num = parseFloat(name);
        if (!isNaN(num)) return num;

        // Context variables
        if (context && context[name] !== undefined) return context[name];

        // Player stats
        if (player && player[name] !== undefined) return player[name];

        // Common aliases
        var aliases = {
            'hp': player ? player.health : 0,
            'maxHp': 100,
            'atk': player ? player.attack : 0,
            'def': player ? player.defense : 0,
            'hit': player ? player.hitRate : 0,
            'level': player ? (player.level || 1) : 1,
            'soul': player ? player.soul : 0,
            'magic': player ? (player.magicDamage || 0) : 0
        };

        return aliases[name] || 0;
    },

    // Apply arithmetic operation
    _applyOp: function(values, op) {
        if (values.length < 2) return;
        var b = values.pop();
        var a = values.pop();

        switch (op) {
            case '+': values.push(a + b); break;
            case '-': values.push(a - b); break;
            case '*': values.push(a * b); break;
            case '/': values.push(b !== 0 ? a / b : 0); break;
            case '%': values.push(b !== 0 ? a % b : 0); break;
            default: values.push(a);
        }
    },

    // Check if a string is an expression
    isExpression: function(expr) {
        if (typeof expr !== 'string') return false;
        return /[+\-*/%()]/.test(expr) || /[a-zA-Z_]/.test(expr);
    },

    // Clear cache
    clearCache: function() {
        this.cache = {};
    }
};

if (typeof KBA !== 'undefined') KBA.systems.expressionSystem = ExpressionSystem;
