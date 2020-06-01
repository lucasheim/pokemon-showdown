'use strict';

const assert = require('./../../assert');
const common = require('./../../common');

let battle;

describe.only('Sleep Talk', function () {
	afterEach(function () {
		battle.destroy();
	});

	it('should be able to use moves that require previous damage received', function () {
		battle = common.createBattle();
		battle.setPlayer('p1', {team: [
			{species: 'Cyndaquil', moves: ['flamethrower']},
			{species: 'Mew', item: 'focussash', moves: ['sleeptalk', 'metalburst']},
		]});
		battle.setPlayer('p2', {team: [
			{species: 'Paras', moves: ['spore', 'bodyslam']},
		]});
		battle.makeChoices('switch 2', 'move spore');
		assert.equal(battle.p1.active[0].status, 'slp');
		battle.boost({spe: 6}, battle.p2.active[0]);
		battle.makeChoices('move sleeptalk', 'move bodyslam');
		assert.equal(battle.p1.active[0].status, 'slp');
		assert.false.fullHP(battle.p2.active[0]);
	});
});
